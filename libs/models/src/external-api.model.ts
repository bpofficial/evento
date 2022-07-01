import {WithId} from "mongodb";

export class ExternalApiModel {
    _id: string;

    url: string;
    name: string;
    authentication: {
        type: 'oauth1' | 'basic' | 'token' | 'apikey'
        credentials: {
            token?: string;
            apiKey?: string;
            username?: string;
            password?: string;
            consumerKey?: string;
            consumerSecret?: string;
        }
    }

    constructor(params: Partial<ExternalApiModel> = {}) {
        this._id = params._id;
        this.url = params.url;
        this.name = params.name;
        this.authentication = params.authentication;
    }

    toJSON(withCredentials = false) {
        return {
            id: this._id,
            url: this.url,
            name: this.name,
            authentication: {
                ...(this.authentication),
                credentials: withCredentials ? this.authentication?.credentials || {} : undefined
            }
        }
    }

    static toJSON(obj: Partial<ExternalApiModel>, withCredentials = false) {
        return new ExternalApiModel(obj).toJSON(withCredentials)
    }

    static fromModel(obj: WithId<ExternalApiModel>) {
        return new ExternalApiModel(obj);
    }
}
