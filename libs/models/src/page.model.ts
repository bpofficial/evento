import {getPaymentAmount, registerInputs} from '@evento/calculations';
import {ObjectId, WithId} from 'mongodb';

export interface Page<T = any> {
    type: string;
    options: {
        content: T[];
    };
}

export class PageModel {
    _id?: ObjectId;

    formId?: string;
    meta?: Record<string, any>;
    pages?: Page<any>[];
    calculations?: Record<string, any>;
    version?: number;

    constructor(params: Partial<PageModel> = {}) {
        this._id = params._id || undefined;
        this.formId = params.formId;
        this.pages = params.pages;
        this.calculations = params.calculations;
        this.version = params.version;
    }

    toJSON() {
        return {
            formId: this?.formId,
            meta: this?.meta,
            pages: this?.pages,
            calculations: this?.calculations,
            version: this?.version,
        };
    }

    static toJSON(obj: Partial<PageModel>) {
        return new PageModel(obj).toJSON();
    }

    static fromModel(obj: WithId<PageModel>) {
        return new PageModel(obj);
    }

    getInputs(): Map<string, string> {
        return registerInputs(this.pages ?? [], this.calculations ?? {});
    }

    getPaymentAmount(key: string, fields: Record<string, any>): number | null {
        return getPaymentAmount(
            key,
            this.getInputs(),
            this.calculations ?? {},
            fields
        );
    }
}
