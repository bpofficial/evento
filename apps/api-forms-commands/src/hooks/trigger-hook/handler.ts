import { formatError, formatResponse } from '@evento/api-utils';
import { HookEventTypes, HookModel } from '@evento/models';
import { APIGatewayEvent } from 'aws-lambda';
import { hookDb } from '../mongo';
import axios from 'axios';

export async function triggerHook(event: APIGatewayEvent) {
    // POST /api/v1/forms/:formId/trigger
    try {
        const formId = (event.pathParameters?.formId ?? '').toLowerCase();
        if (!formId) {
            return formatError('Not Found', 'Path does not exist', 404);
        }

        const data = JSON.parse(event.body);

        const events: HookEventTypes[] = (
            event.queryStringParameters?.events ?? ''
        )
            .replace(/\s+/gi, '')
            .split(',')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter((v) => HookModel.EVENTS.includes(v as any)) as any;
        if (!events.length) {
            return formatError(
                'Bad Request',
                `Expected at least one event type to trigger in the 'events' query parameter field.`,
                400
            );
        }

        const db = await hookDb();
        const hooks = await db.collections.Hooks.find({
            $and: [{ types: { $in: events } }, { formId }],
        }).toArray();

        console.debug(`Found ${hooks?.length} hooks for provided events.`)

        // TODO: Create signature from account hook secret
        const promises = hooks.map((hook) => {
            return axios.post(hook.url, {
                formId,
                data,
            });
        });

        await Promise.all(promises);

        return formatResponse()(204);
    } catch (error) {
        console.log(error)
        return formatError('Internal Server Error', null, 500);
    }
}
