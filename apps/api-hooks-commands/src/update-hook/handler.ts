import { formatError, formatResponse } from '@evento/api-utils';
import { HookModel } from '@evento/models';
import { APIGatewayEvent } from 'aws-lambda';
import { hookDb } from '../mongo';

export async function updateHook(event: APIGatewayEvent) {
    // POST /api/v1/hooks/:hookId
    try {
        const hookId = event.pathParameters.hookId || null;
        if (!hookId) {
            return formatError('Not Found', 'Hook not found', 404);
        }

        let body: Record<string, any>;
        try {
            body = JSON.parse(event.body);
        } catch (error) {
            //
        }

        const model = HookModel.fromJSON(body);
        const { collections } = await hookDb();
        const result = await collections.Hooks.updateOne(
            { _id: hookId },
            model
        );

        if (!result.matchedCount) {
            return formatError('Not Found', 'Hook not found', 404);
        }

        return formatResponse()(204);
    } catch (error) {
        //
    }
}
