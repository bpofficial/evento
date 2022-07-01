import { EventoApi } from './api';
import { FormModel } from '@evento/models';
import { Either, left, right } from 'fp-ts/Either';
import { AxiosError } from 'axios';

export class PagesApi {
    static ENDPOINT = 'pages';
    static DEVELOPMENT_SERVICES = [':4003/', ':4004/'];

    private id(str: string) {
        return `${PagesApi.ENDPOINT}/${str}`;
    }

    constructor(private readonly api: EventoApi) {
        // emptiness
    }

    public retrieve(
        id: string,
        version?: string
    ): Promise<Either<AxiosError, FormModel>> {
        return this.api
            .request({
                type: 'query',
                method: 'GET',
                url: this.id(id),
                params: {
                    version: version || undefined,
                },
            })
            .then((res) => {
                return right(new FormModel(res.data));
            })
            .catch((error) => {
                return left(error);
            });
    }

    public async list(): Promise<FormModel[]> {
        return this.api.request({
            type: 'query',
            method: 'GET',
            url: PagesApi.ENDPOINT,
        }) as any;
    }

    public async update(id: string, data: any): Promise<any> {
        return this.api.request({
            type: 'command',
            method: 'PATCH',
            url: this.id(id),
            data,
        });
    }

    public async create(data: any): Promise<any> {
        return this.api.request({
            type: 'command',
            method: 'POST',
            url: PagesApi.ENDPOINT,
            data,
        });
    }

    public async del(id: string): Promise<any> {
        return this.api.request({
            type: 'command',
            method: 'DELETE',
            url: this.id(id),
        });
    }
}

