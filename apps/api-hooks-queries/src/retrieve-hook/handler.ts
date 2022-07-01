import { formatError, formatResponse } from '@evento/api-utils';
import { HookModel } from '@evento/models';
import { APIGatewayEvent } from 'aws-lambda';
import { hookDb } from '../mongo';

export async function handler(event: APIGatewayEvent) {
    try {
        const hookId = event.pathParameters.hookId || null;
        if (!hookId) {
            return formatError('Not Found', 'Hook not found', 404);
        }

        const { collections } = await hookDb();
        const hook = await collections.Hooks.findOne({ _id: hookId });

        if (!hook) {
            return formatError('Not Found', 'Hook not found', 404);
        }

        const result = HookModel.fromModel(hook).toJSON();
        return formatResponse(result)(200);
    } catch (error) {
        //
    }
}
