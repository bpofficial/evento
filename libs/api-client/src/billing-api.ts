import {EventoApi} from "./api";
import {Either, left, right} from "fp-ts/Either";
import {AxiosError} from "axios";
import {PageModel} from "@evento/models";

export class BillingApi {
    static ENDPOINT = 'pages'
    static DEVELOPMENT_SERVICES = [':4001/', ':4002/']

    constructor(private readonly api: EventoApi) {
    }

    public createPaymentIntent(formId: string, values: Record<string, any>, version?: string): Promise<Either<AxiosError, PageModel>> {
        return this.api.request({
            type: 'command',
            method: 'POST',
            url: `/${BillingApi.ENDPOINT}/checkout`,
            params: {
                formId,
                version: version || undefined
            },
            data: values
        }).then((res) => {
            return right(new PageModel(res.data));
        }).catch((error) => {
            return left(error);
        });
    }
}
