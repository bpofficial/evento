import { getPaymentAmount, registerInputs } from '@evento/calculations';
import { Form } from 'formik';
import { ObjectId, WithId } from 'mongodb';

export interface Page<T = any> {
    type: string;
    options: {
        content: T[];
    } & Record<string, string | number | boolean>;
}

export class FormModel {
    static RESERVED_KEYS = ['__FORM_ID__'];

    _id?: ObjectId;

    formId?: string;
    meta?: Record<string, any>;
    pages?: Page[];
    calculations?: Record<string, any>;
    validations?: Record<string, any>;
    version?: number;
    hooksEnabled?: boolean;

    constructor(params: Partial<FormModel> = {}) {
        this._id = params._id || undefined;
        this.formId = params.formId;
        this.pages = params.pages;
        this.calculations = params.calculations;
        this.validations = params.validations;
        this.version = params.version;
        this.hooksEnabled = params.hooksEnabled;

        this.setDefaults();
    }

    toJSON() {
        return {
            id: this._id,
            formId: this.formId,
            meta: this?.meta,
            pages: this?.pages,
            calculations: this?.calculations,
            validations: this?.validations,
            version: this?.version,
            hooksEnabled: !!this?.hooksEnabled,
        };
    }

    static toJSON(obj: Partial<FormModel>) {
        return new FormModel(obj).toJSON();
    }

    static fromJSON(obj: Record<string, any>) {
        return new FormModel({
            _id: obj?.['_id'],
            formId: obj?.['formId'],
            meta: obj?.['meta'],
            pages: obj?.['pages'],
            calculations: obj?.['calculations'],
            version: obj?.['version'],
            hooksEnabled: obj?.['hooksEnabled'],
        });
    }

    static fromJSONArray(objs: Record<string, any>[]) {
        return objs.map((o) => FormModel.fromJSON(o));
    }

    static fromModel(obj: WithId<FormModel>) {
        return new FormModel(obj);
    }

    static fromModels(objs: WithId<FormModel>[]) {
        return objs.map((o) => FormModel.fromModel(o));
    }

    static modelsToJsonArray(objs: WithId<FormModel>[]) {
        return FormModel.fromModels(objs).map((o) => FormModel.toJSON(o));
    }

    private setDefaults() {
        this.calculations = {
            ...(this.calculations ?? {}),
            __FORM_ID__: {
                $literal: this.formId,
            },
        };
    }

    getInputs(): Map<string, string> {
        this.setDefaults();
        const inputs = registerInputs(
            this.pages ?? [],
            this.calculations ?? {}
        );

        // defaults
        inputs.set('__FORM_ID__', '$calculation');

        return inputs;
    }

    getPaymentContent() {
        for (const page of this.pages ?? []) {
            for (const content of page?.options?.content ?? []) {
                if (content.type === 'ContentPayment') {
                    return content;
                }
            }
        }
        return null;
    }

    getPaymentAmount(fields: Record<string, any>): number | null {
        this.setDefaults();
        const content = this.getPaymentContent();
        return getPaymentAmount(
            content?.options?.amount,
            this.getInputs(),
            this.calculations ?? {},
            fields
        );
    }

    getAsyncValidators(): Map<string, string> {
        return Object.entries(this.validations ?? {})
            .filter(([_, value]) => !!value.$async)
            .map(([key, value]) => ({ field: key, validator: value }))
            .reduce((a, v) => a.set(v.field, v.validator) && a, new Map());
    }
}
