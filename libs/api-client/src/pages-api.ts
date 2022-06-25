import {EventoApi} from "./api";
import {PageModel} from "@evento/models";
import {Either, left, right} from 'fp-ts/Either';
import {AxiosError} from "axios";

export class PagesApi {
    constructor(private readonly api: EventoApi) {
        // emptiness
    }

    public retrieve(id: string, version?: string): Promise<Either<AxiosError, PageModel>> {
        return this.api.request({
            method: 'GET',
            url: 'pages/' + id,
            params: {
                version: version || undefined
            }
        }).then((res) => {
            return right(new PageModel(res.data));
        }).catch((error) => {
            return left(error);
        });
    }

    public async list(): Promise<PageModel[]> {
        return this.api.request({method: 'GET', url: 'pages'}) as any;
    }

    public async update(id: string, data: any): Promise<any> {
        return this.api.request({method: 'PATCH', url: 'pages/' + id, data});
    }

    public async create(data: any): Promise<any> {
        return this.api.request({method: 'POST', url: 'pages', data});
    }

    public async del(id: string): Promise<any> {
        return this.api.request({method: 'DELETE', url: 'pages/' + id});
    }
}
