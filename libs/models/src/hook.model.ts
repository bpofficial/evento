import { WithId } from 'mongodb';

type FormEventType = 'form.open' | 'form.next' | 'form.submit';

export type EventType = FormEventType;

/**
 * Attach events to a form such as a particular onNext event on a given page
 * triggers an assigned hook.
 */
export class HookModel {
    _id: string;

    url: string;
    name: string;
    types: EventType[];

    constructor(params: Partial<HookModel> = {}) {
        this._id = params._id;
        this.url = params.url;
        this.name = params.name;
        this.types = params.types;
    }

    toJSON() {
        return {
            id: this._id,
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

    // eslint-disable-next-line @typescript-eslint/ban-types
    static fromJSON(obj: Record<string, any>) {
        return new HookModel({
            url: obj?.url,
            name: obj?.name,
            types: obj?.types && obj.types instanceof Array ? obj.types : [],
        });
    }
}
