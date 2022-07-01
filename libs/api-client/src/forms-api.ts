import { EventoApi } from './api';
import { FormModel } from '@evento/models';
import { Either, left, right } from 'fp-ts/Either';
import { AxiosError } from 'axios';

export class FormsApi {
    static ENDPOINT = 'forms';
    static DEVELOPMENT_SERVICES = [':4003/', ':4004/'];

    private id(str: string) {
        return `${FormsApi.ENDPOINT}/${str}`;
    }

    constructor(private readonly api: EventoApi) {
        // emptiness
    }

    public async retrieve(
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
            .then((res) => right(new FormModel(res.data.data)))
            .catch((err) => left(err));
    }

    public async list(): Promise<Either<AxiosError, FormModel[]>> {
        return this.api
            .request({
                type: 'query',
                method: 'GET',
                url: FormsApi.ENDPOINT,
            })
            .then((res) => right(FormModel.fromJSONArray(res.data.data)))
            .catch((err) => left(err));
    }

    public async update(
        id: string,
        data: FormModel | ReturnType<FormModel['toJSON']>
    ): Promise<Either<AxiosError, { success: boolean }>> {
        return this.api
            .request({
                type: 'command',
                method: 'PATCH',
                url: this.id(id),
                data: data instanceof FormModel ? data.toJSON() : data,
            })
            .then(() => right({ success: true }))
            .catch((err) => left(err));
    }

    public async create(
        data: FormModel | ReturnType<FormModel['toJSON']>
    ): Promise<Either<AxiosError, ReturnType<FormModel['toJSON']>>> {
        return this.api
            .request({
                type: 'command',
                method: 'POST',
                url: FormsApi.ENDPOINT,
                data: data instanceof FormModel ? data.toJSON() : data,
            })
            .then((res) => right(res.data.data))
            .catch((err) => left(err));
    }

    public async del(
        id: string
    ): Promise<Either<AxiosError, { success: boolean }>> {
        return this.api
            .request({
                type: 'command',
                method: 'DELETE',
                url: this.id(id),
            })
            .then(() => right({ success: true }))
            .catch((err) => left(err));
    }
}
