import { EventoApi } from './api';
import { Either, left, right } from 'fp-ts/Either';
import { AxiosError } from 'axios';

export class BillingApi {
    static ENDPOINT = 'billing';
    static DEVELOPMENT_SERVICES = [':4001/', ':4002/'];

    constructor(private readonly api: EventoApi) {}

    public createPaymentIntent(
        formId: string,
        values: Record<string, any>,
        metadata?: Record<string, string>,
        version?: number
    ): Promise<Either<AxiosError, any>> {
        return this.api
            .request({
                type: 'command',
                method: 'POST',
                url: `/${BillingApi.ENDPOINT}/checkout`,
                params: {
                    formId,
                    formVersion: version || undefined,
                },
                data: {
                    fields: values,
                    metadata,
                },
            })
            .then((res) => {
                return right(res.data);
            })
            .catch((error) => {
                return left(error);
            });
    }
}
