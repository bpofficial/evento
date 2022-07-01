import { formatError, formatResponse } from '@evento/api-utils';
import { ValidatorModel } from '@evento/models';
import { APIGatewayEvent } from 'aws-lambda';
import { formDb } from '../../mongo';

export async function createAsyncValidator(event: APIGatewayEvent) {
    // POST /api/v1/validators
    try {
        const data = JSON.parse(event.body);
        const form = ValidatorModel.fromJSON(data);

        const db = await formDb();
        const result = await db.collections.Validators.insertOne(form);

        return formatResponse({ id: result.insertedId })(201);
    } catch (error) {
        return formatError('Internal Server Error', null, 500);
    }
}
