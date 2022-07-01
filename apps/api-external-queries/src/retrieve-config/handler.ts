import { APIGatewayEvent } from 'aws-lambda';
import {
    formatError,
    formatResponse,
    getMongoDBBuilder,
} from '@evento/api-utils';
import { config } from '../../config';
import { FormModel } from '@evento/models';
import { WithId } from 'mongodb';

const collections = {
    Forms: FormModel.prototype,
} as const;

const mongodb = getMongoDBBuilder({
    url: config.db.url,
    collections,
});

/**
 * The client will send the current form values & a payment form field key,
 * this function will calculate - based off of the values and
 * the stored pages for the given formId - the charge.
 */
export async function handler(event: APIGatewayEvent) {
    // GET /api/v1/forms/:formId
    const pageId = event.pathParameters?.pageId;
    let pageVersion: string | number =
        event.queryStringParameters?.version ?? null;

    if (pageVersion) {
        pageVersion = Number(pageVersion);
        if (Number.isNaN(pageVersion)) {
            return formatError(
                'Bad Request',
                `Invalid value provided for 'version' field expected number.`
            );
        }
    }

    if (!pageId) {
        return formatError('Not Found', 'Page not found', 404);
    }

    let result: WithId<FormModel>;
    try {
        const { collections } = await mongodb('');
        result = await collections.Forms.findOne({
            // spread will remove version if it's undefined
            ...{
                formId: pageId,
                version: Number(pageVersion) || undefined,
            },
        });
    } catch (error) {
        return formatError(
            'Internal Server Error',
            'Failed to retrieve page.',
            500
        );
    }

    if (!result) {
        return formatError('Not Found', 'Page not found', 404);
    }

    const page = FormModel.fromModel(result).toJSON();

    return formatResponse(page)(200);
}
