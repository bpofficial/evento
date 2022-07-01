import { formatError, formatResponse } from '@evento/api-utils';
import { FormModel } from '@evento/models';
import { APIGatewayEvent } from 'aws-lambda';
import { ObjectId } from 'mongodb';
import { formDb } from '../../mongo';

export async function updateForm(event: APIGatewayEvent) {
    // PATCH /api/v1/forms/:formId
    try {
        const formId = event.pathParameters.formId;
        if (!formId) {
            return formatError('Not Found', 'Path does not exist', 404);
        }

        const data = JSON.parse(event.body);
        const form = FormModel.fromJSON(data);

        const db = await formDb();
        const result = await db.collections.Forms.updateOne(
            {
                _id: new ObjectId(formId),
            },
            form
        );

        if (!result.upsertedCount) {
            return formatError('Not Found', 'Form not found', 404);
        }

        return formatResponse()(204);
    } catch (error) {
        return formatError('Internal Server Error', null, 500);
    }
}
