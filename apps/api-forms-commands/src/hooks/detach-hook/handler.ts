import { formatError, formatResponse } from '@evento/api-utils';
import { APIGatewayEvent } from 'aws-lambda';
import { hookDb } from '../mongo';

export async function detachHook(event: APIGatewayEvent) {
    // DELETE /api/v1/forms/:formId/hooks/:hookId
    try {
        const formId = event.pathParameters.formId;
        if (!formId) {
            return formatError('Not Found', 'Path does not exist', 404);
        }

        const hookId = event.pathParameters.hookId;
        if (!hookId) {
            return formatError('Not Found', 'Path does not exist', 404);
        }

        const db = await hookDb();
        const result = await db.collections.Hooks.deleteOne({
            formId,
            _id: hookId,
        });

        if (!result.deletedCount) {
            return formatError('Not Found', 'Hook not found', 404);
        }

        return formatResponse()(204);
    } catch (error) {
        return formatError('Internal Server Error', null, 500);
    }
}
