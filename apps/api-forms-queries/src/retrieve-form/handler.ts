import { APIGatewayEvent } from 'aws-lambda';
import { formatError, formatResponse } from '@evento/api-utils';
import { FormModel } from '@evento/models';
import { WithId } from 'mongodb';
import { formDb } from '../mongo';

export async function retrieveForm(event: APIGatewayEvent) {
    // GET /api/v1/forms/:formId
    try {
        const formId = event.pathParameters?.pageId;
        let formVersion: string | number =
            event.queryStringParameters?.version ?? null;

        if (formVersion) {
            formVersion = Number(formVersion);
            if (Number.isNaN(formVersion)) {
                return formatError(
                    'Bad Request',
                    `Invalid value provided for 'version' field expected number.`
                );
            }
        }

        if (!formId) {
            return formatError('Not Found', 'Form not found', 404);
        }

        let form: WithId<FormModel>;
        try {
            const { collections } = await formDb();
            form = await collections.Forms.findOne({
                // spread will remove version if it's undefined
                ...{
                    formId,
                    version: Number(formVersion) || undefined,
                },
            });
        } catch (error) {
            return formatError(
                'Internal Server Error',
                'Failed to retrieve form.',
                500
            );
        }

        if (!form) {
            return formatError('Not Found', 'Form not found', 404);
        }

        const result = FormModel.fromModel(form).toJSON();
        return formatResponse(result)(200);
    } catch (error) {
        return formatError('Internal Server Error', null, 500);
    }
}
