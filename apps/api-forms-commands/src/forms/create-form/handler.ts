import { formatError, formatResponse } from '@evento/api-utils';
import { FormModel } from '@evento/models';
import { APIGatewayEvent } from 'aws-lambda';
import { formDb } from '../mongo';

export async function createForm(event: APIGatewayEvent) {
    // POST /api/v1/forms
    try {
        const data = JSON.parse(event.body);
        const form = FormModel.fromJSON(data);

        const db = await formDb();
        const result = await db.collections.Forms.insertOne(form);

        return formatResponse({ id: result.insertedId })(201);
    } catch (error) {
        return formatError('Internal Server Error', null, 500);
    }
}
