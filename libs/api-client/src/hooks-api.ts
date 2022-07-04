import { EventoApi } from './api';
import { FormModel, HookEventTypes } from '@evento/models';
import { Either, left, right } from 'fp-ts/Either';
import { AxiosError } from 'axios';

export class HooksApi {
    static ENDPOINT = 'forms';
    static DEVELOPMENT_SERVICES = [':4003/', ':4004/'];

    private id(formId: string, hookId?: string) {
        return (
            `${HooksApi.ENDPOINT}/${formId}/hooks` +
            (hookId ? `/${hookId}` : '')
        );
    }

    constructor(private readonly api: EventoApi) {
        // emptiness
    }

    public async trigger(
        formId: string,
        events: HookEventTypes | HookEventTypes[],
        data: any
    ): Promise<Either<AxiosError, boolean>> {
        return this.api
            .request({
                type: 'command',
                method: 'POST',
                url: `${this.id(formId)}/trigger`,
                data: {
                    fields: data,
                },
                params: {
                    events: events instanceof Array ? events.join(',') : events,
                },
            })
            .then(() => right(true))
            .catch((err) => left(err));
    }

    public async retrieve(
        formId: string,
        hookId: string,
        version?: string
    ): Promise<Either<AxiosError, FormModel>> {
        return this.api
            .request({
                type: 'query',
                method: 'GET',
                url: this.id(formId, hookId),
                params: {
                    version: version || undefined,
                },
            })
            .then((res) => right(new FormModel(res.data.data)))
            .catch((err) => left(err));
    }

    public async list(
        formId: string
    ): Promise<Either<AxiosError, FormModel[]>> {
        return this.api
            .request({
                type: 'query',
                method: 'GET',
                url: this.id(formId),
            })
            .then((res) => right(FormModel.fromJSONArray(res.data.data)))
            .catch((err) => left(err));
    }

    public async update(
        formId: string,
        hookId: string,
        data: FormModel | ReturnType<FormModel['toJSON']>
    ): Promise<Either<AxiosError, { success: boolean }>> {
        return this.api
            .request({
                type: 'command',
                method: 'PATCH',
                url: this.id(formId, hookId),
                data: data instanceof FormModel ? data.toJSON() : data,
            })
            .then(() => right({ success: true }))
            .catch((err) => left(err));
    }

    public async create(
        formId: string,
        data: FormModel | ReturnType<FormModel['toJSON']>
    ): Promise<Either<AxiosError, ReturnType<FormModel['toJSON']>>> {
        return this.api
            .request({
                type: 'command',
                method: 'POST',
                url: this.id(formId),
                data: data instanceof FormModel ? data.toJSON() : data,
            })
            .then((res) => right(res.data.data))
            .catch((err) => left(err));
    }

    public async del(
        formId: string,
        hookId: string
    ): Promise<Either<AxiosError, { success: boolean }>> {
        return this.api
            .request({
                type: 'command',
                method: 'DELETE',
                url: this.id(formId, hookId),
            })
            .then(() => right({ success: true }))
            .catch((err) => left(err));
    }
}
