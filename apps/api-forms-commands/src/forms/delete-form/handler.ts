import { formatError, formatResponse } from '@evento/api-utils';
import { APIGatewayEvent } from 'aws-lambda';
import { ObjectId } from 'mongodb';
import { formDb } from '../mongo';

export async function deleteForm(event: APIGatewayEvent) {
    // DELETE /api/v1/forms/:formId
    try {
        const formId = event.pathParameters.formId;
        if (!formId) {
            return formatError('Not Found', 'Path does not exist', 404);
        }

        const db = await formDb();
        const result = await db.collections.Forms.deleteOne({
            _id: new ObjectId(formId),
        });

        if (!result.deletedCount) {
            return formatError('Not Found', 'Form not found', 404);
        }

        return formatResponse()(204);
    } catch (error) {
        return formatError('Internal Server Error', null, 500);
    }
}
