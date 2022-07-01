import { formatError, formatResponse } from '@evento/api-utils';
import { HookModel } from '@evento/models';
import { APIGatewayEvent } from 'aws-lambda';
import { hookDb } from '../mongo';

export async function attachHook(event: APIGatewayEvent) {
    // POST /api/v1/forms/:formId/hooks
    try {
        const formId = event.pathParameters.formId;
        if (!formId) {
            return formatError('Not Found', 'Path does not exist', 404);
        }

        const data = JSON.parse(event.body);
        const hook = HookModel.fromJSON(data);
        hook.formId = formId;

        const db = await hookDb();
        const result = await db.collections.Hooks.insertOne(hook);

        return formatResponse({ id: result.insertedId })(201);
    } catch (error) {
        return formatError('Internal Server Error', null, 500);
    }
}
