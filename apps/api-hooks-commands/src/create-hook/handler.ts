import { formatResponse } from '@evento/api-utils';
import { HookModel } from '@evento/models';
import { APIGatewayEvent } from 'aws-lambda';
import { hookDb } from '../mongo';

export async function createHook(event: APIGatewayEvent) {
    // POST /api/v1/hooks

    try {
        let body: Record<string, any>;
        try {
            body = JSON.parse(event.body);
        } catch (error) {
            //
        }

        const model = HookModel.fromJSON(body);
        const { collections } = await hookDb();
        const hook = await collections.Hooks.insertOne(model);
        const id = hook.insertedId;

        return formatResponse({ id })(201);
    } catch (error) {
        //
    }
}
