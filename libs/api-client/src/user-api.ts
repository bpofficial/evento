import {EventoApi} from "./api";

export class UserApi {
    constructor(private readonly api: EventoApi) {
        // emptiness
    }

    public async retrieve(id: string) {
        return this.api.request({method: 'GET', url: 'users/' + id});
    }

    public async list() {
        return this.api.request({method: 'GET', url: 'users'});
    }

    public async update(id: string, data: any) {
        return this.api.request({method: 'PATCH', url: 'users' + id, data});
    }

    public async create(data: any) {
        return this.api.request({method: 'POST', url: 'users', data});
    }

    public async del(id: string) {
        return this.api.request({method: 'DELETE', url: 'users/' + id});
    }
}
