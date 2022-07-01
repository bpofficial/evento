import { formatError, formatResponse } from '@evento/api-utils';
import { APIGatewayEvent } from 'aws-lambda';
import { hookDb } from '../mongo';

export async function deleteHook(event: APIGatewayEvent) {
    try {
        const hookId = event.pathParameters.hookId || null;
        if (!hookId) {
            return formatError('Not Found', 'Hook not found', 404);
        }

        const { collections } = await hookDb();
        const result = await collections.Hooks.deleteOne({ _id: hookId });

        if (!result.deletedCount) {
            return formatError('Not Found', 'Hook not found', 404);
        }

        return formatResponse()(204);
    } catch (error) {
        //
    }
}
