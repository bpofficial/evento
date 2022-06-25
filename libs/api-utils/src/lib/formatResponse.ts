import {APIGatewayEvent} from 'aws-lambda';

interface Response {
    statusCode: number;
    body: string;
}

const joinQueryStringParams = (
    params: Record<string, string | number> = {}
) => {
    if (!params) return '';
    return Object.keys(params).reduce((a, v, i) => {
        return (a += `${i > 0 ? '&' : ''}${v}=${params[v]}`);
    }, '?');
};

export function formatResponse(): (statusCode: number) => Response;
// eslint-disable-next-line @typescript-eslint/ban-types
export function formatResponse<T extends Object>(
    data: T & { object?: string },
    event?: undefined
): (statusCode: number) => Response;
export function formatResponse<T extends Array<unknown>>(
    data: T,
    event: APIGatewayEvent,
    hasMore?: boolean
): (statusCode: number) => Response;
export function formatResponse(...args: unknown[]) {
    if (!args.length) {
        return ({statusCode}) => ({
            statusCode,
        });
    }
    const arg1: any = args[0];
    if (arg1 instanceof Array) {
        const event = args[1] as APIGatewayEvent;
        return (statusCode: number) => ({
            statusCode,
            body: JSON.stringify({
                object: 'list',
                url:
                    args.length > 1
                        ? event.path +
                        joinQueryStringParams(event.queryStringParameters)
                        : null,
                hasMore: args.length > 2 ? args[2] : false,
                data: arg1,
            }),
        });
    }
    if (arg1?.statusCode || arg1?.body) {
        return (statusCode: number) => ({
            statusCode: arg1.statusCode || statusCode,
            body:
                typeof arg1.body === 'string'
                    ? arg1.body
                    : JSON.stringify(arg1.body),
        });
    }
    return (statusCode: number) => ({
        statusCode,
        body: JSON.stringify(arg1),
    });
}
