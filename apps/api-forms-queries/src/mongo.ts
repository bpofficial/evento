import { getMongoDBBuilder } from '@evento/api-utils';
import { FormModel } from '@evento/models';
import { config } from '../config';

const collections = {
    Forms: FormModel.prototype,
} as const;

export const formDb = getMongoDBBuilder({
    url: config.db.url,
    collections,
});
