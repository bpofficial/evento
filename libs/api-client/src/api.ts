import axios, {AxiosRequestConfig} from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as createSignature from 'oauth1-signature';
import {PagesApi} from "./pages-api";
import {UserApi} from "./user-api";
import {BillingApi} from "./billing-api";

interface EventoApiConstructorParams {
    gatewayUrl: string;
    accessToken?: string;
    credentials?: {
        consumerSecret: string;
        consumerKey: string;
    }
}

const DEVELOPMENT_SERVICES = {
    [BillingApi.ENDPOINT]: BillingApi.DEVELOPMENT_SERVICES,
    [PagesApi.ENDPOINT]: PagesApi.DEVELOPMENT_SERVICES
}

export class EventoApi {
    private readonly development: boolean;
    private readonly gatewayUrl: string;
    private readonly accessToken: string | null;
    private readonly credentials: EventoApiConstructorParams['credentials'] | null;

    constructor(params: EventoApiConstructorParams) {
        this.development = !['prod', 'production'].includes(process.env['NODE_ENV']?.toLowerCase?.() ?? '');
        this.gatewayUrl = params.gatewayUrl;
        this.accessToken = params.accessToken || null;
        this.credentials = params.credentials || null;

        if (this.accessToken && this.accessToken.includes('Bearer ')) {
            this.accessToken = this.accessToken.replace('Bearer ', '');
        }
    }

    private getServiceUrl(baseUrl: string, url: string, type: 'command' | 'query') {
        if (!this.development) return baseUrl + url;
        if (url[0] === '/') {
            url = url.slice(1);
        }
        let service;
        for (const svc in DEVELOPMENT_SERVICES) {
            if (service) continue;
            if (url.toLowerCase().startsWith(svc)) {
                const idx = type === 'command' ? 0 : 1
                service = DEVELOPMENT_SERVICES[svc][idx];
            }
        }
        if (service) {
            return baseUrl + service + url
        }
        return baseUrl+ url;
    }

    public async request<T = any>(config: AxiosRequestConfig<T> & { type: 'command' | 'query' }) {
        config.baseURL = this.gatewayUrl;

        const params = config.params ?? {};
        const url = new URL(this.getServiceUrl(config.baseURL, config.url || '', config.type));

        if (this.credentials) {
            const res = createSignature({
                consumerKey: this.credentials.consumerKey,
                consumerSecret: this.credentials.consumerSecret,
                method: config.method,
                url: url.toString(),
                queryParams: params
            })
            config.params = {...params, ...(res?.params ?? {})};
        }

        if (this.accessToken && !this.credentials) {
            config.headers = {Authorization: `Bearer ${this.accessToken}`};
        }

        return axios.request(config);
    }

    get pages() {
        return new PagesApi(this);
    }

    get users() {
        return new UserApi(this);
    }

    get billing() {
        return new BillingApi(this);
    }
}
