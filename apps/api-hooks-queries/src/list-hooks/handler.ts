import { formatError, formatResponse } from '@evento/api-utils';
import { HookModel } from '@evento/models';
import { APIGatewayEvent } from 'aws-lambda';
import { hookDb } from '../mongo';

export async function listHooks(event: APIGatewayEvent) {
    try {
        const hookId = event.pathParameters.hookId || null;
        if (!hookId) {
            return formatError('Not Found', 'Hook not found', 404);
        }

        const { collections } = await hookDb();
        const hooks = await collections.Hooks.find().toArray();
        const result = HookModel.modelsToJsonArray(hooks);
        return formatResponse(result, event, false)(200);
    } catch (error) {
        //
    }
}
