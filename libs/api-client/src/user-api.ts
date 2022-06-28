import {EventoApi} from "./api";

export class UserApi {
    constructor(private readonly api: EventoApi) {
        // emptiness
    }

    public async retrieve(id: string) {
        return this.api.request({type: 'query', method: 'GET', url: 'users/' + id});
    }

    public async list() {
        return this.api.request({type: 'query', method: 'GET', url: 'users'});
    }

    public async update(id: string, data: any) {
        return this.api.request({type: 'command', method: 'PATCH', url: 'users' + id, data});
    }

    public async create(data: any) {
        return this.api.request({type: 'command', method: 'POST', url: 'users', data});
    }

    public async del(id: string) {
        return this.api.request({type: 'command', method: 'DELETE', url: 'users/' + id});
    }
}
