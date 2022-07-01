import { getMongoDBBuilder } from '@evento/api-utils';
import { HookModel } from '@evento/models';
import { config } from '../../config';

const collections = {
    Hooks: HookModel.prototype,
};

export const hookDb = getMongoDBBuilder({ url: config.db.url, collections });
