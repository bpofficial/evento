import { WithId } from 'mongodb';

type FormEventType = 'form.open' | 'form.next' | 'form.submit';

export type HookEventTypes = FormEventType;

/**
 * Attach events to a form such as a particular onNext event on a given page
 * triggers an assigned hook.
 */
export class HookModel {
    static readonly EVENTS: HookEventTypes[] = [
        'form.next',
        'form.open',
        'form.submit',
    ];

    _id: string;

    formId: string;
    url: string;
    name: string;
    types: HookEventTypes[];

    constructor(params: Partial<HookModel> = {}) {
        this._id = params._id || '';
        this.formId = params.formId || '';
        this.url = params.url || '';
        this.name = params.name || '';
        this.types = params.types || [];
    }

    toJSON() {
        return {
            id: this._id,
            formId: this.formId,
            url: this.url,
            name: this.name,
            types: this.types,
        };
    }

    static toJSON(obj: Partial<HookModel>) {
        return new HookModel(obj).toJSON();
    }

    static fromModel(obj: WithId<HookModel>) {
        return new HookModel(obj);
    }

    static fromModels(objs: WithId<HookModel>[]) {
        return objs.map((o) => HookModel.fromModel(o));
    }

    static modelsToJsonArray(objs: WithId<HookModel>[]) {
        return HookModel.fromModels(objs).map((o) => HookModel.toJSON(o));
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    static fromJSON(obj: Record<string, any>) {
        return new HookModel({
            _id: obj?.['_id'],
            formId: obj?.['formId'],
            url: obj?.['url'],
            name: obj?.['name'],
            types:
                obj?.['types'] && obj['types'] instanceof Array
                    ? obj['types']
                    : [],
        });
    }
}
