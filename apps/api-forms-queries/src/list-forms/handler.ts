import { formatError, formatResponse } from '@evento/api-utils';
import { FormModel } from '@evento/models';
import { APIGatewayEvent } from 'aws-lambda';
import { formDb } from '../mongo';

export async function listForms(event: APIGatewayEvent) {
    try {
        const hookId = event.pathParameters.hookId || null;
        if (!hookId) {
            return formatError('Not Found', 'Hook not found', 404);
        }

        const { collections } = await formDb();
        const forms = await collections.Forms.find().toArray();
        const result = FormModel.modelsToJsonArray(forms);
        return formatResponse(result, event, false)(200);
    } catch (error) {
        //
    }
}
