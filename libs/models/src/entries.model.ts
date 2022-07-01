import {WithId} from "mongodb";

export class EntryModel {
    _id?: string;
    formId?: string;
    fields?: Record<string, any>;

    constructor(params: Partial<EntryModel> = {}) {
        this._id = params._id;
        this.formId = params.formId;
        this.fields = params.fields
    }

    toJSON() {
        return {
            id: this._id,
            formId: this.formId,
            fields: this.fields
        }
    }

    static toJSON(obj: Partial<EntryModel>) {
        return new EntryModel(obj).toJSON()
    }

    static fromModel(obj: WithId<EntryModel>) {
        return new EntryModel(obj);
    }
}
