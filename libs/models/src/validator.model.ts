import axios from 'axios';
import { WithId } from 'mongodb';

export class ValidatorModel {
    _id: string;

    url: string;
    name: string;
    method: 'GET' | 'POST';

    constructor(params: Partial<ValidatorModel> = {}) {
        this._id = params._id || '';
        this.url = params.url || '';
        this.method = params.method || 'GET';
        this.name = params.name || '';
    }

    toJSON() {
        return {
            id: this._id,
            url: this.url,
            method: this.method,
            name: this.name,
        };
    }

    static toJSON(obj: Partial<ValidatorModel>) {
        return new ValidatorModel(obj).toJSON();
    }

    static fromJSON(obj: Record<string, string>) {
        return new ValidatorModel({
            _id: obj?.['_id'],
            url: obj?.['url'],
            method: ['GET', 'POST'].includes(obj?.['method'])
                ? (obj['method'] as 'GET' | 'POST')
                : 'GET',
            name: obj?.['name'],
        });
    }

    static fromModel(obj: WithId<ValidatorModel>) {
        return new ValidatorModel(obj);
    }

    async callValidator(key: string, value: string | number) {
        try {
            const url = new URL(this.url);
            const method: 'get' | 'post' = this.method.toLowerCase() as any;
            let data: Record<string, string | number> = {};
            if (this.method === 'GET') {
                url.searchParams.set('key', key);
                url.searchParams.set('value', value.toString());
            } else {
                data = { key, value };
            }
            const result = await axios[method](url.toString(), data);
            if (result.status.toString().startsWith('2')) {
                return { success: true, code: result.status };
            } else {
                return {
                    success: false,
                    message: result?.data?.message,
                    code: result.status,
                };
            }
        } catch (error) {
            return {
                success: false,
                message: (error as any)?.message,
                code: 500,
            };
        }
    }
}
