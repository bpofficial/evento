import {APIGatewayEvent, Context} from 'aws-lambda';
import {renderApplication, RenderContext} from './render';
import {EventoApp} from '@evento/ui-bits';
import {join} from 'path';
import {PokerCalculations, PokerPages} from './test-config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const StaticFileHandler = require('serverless-aws-static-file-handler');
const clientFilesPath = join(__dirname, './assets/');
const fileHandler = new StaticFileHandler(clientFilesPath);

export const handler = async () => {
    const context: RenderContext<typeof EventoApp> = {
        props: {
            environment: {
                api: {
                    baseUrl: 'http://localhost',
                },
            },
            configuration: {
                formId: '123',
                pages: PokerPages,
                calculations: PokerCalculations,
            },
            helmet: {
                title: 'Poker Night',
            },
        },
    };

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html',
        },
        body: renderApplication(EventoApp, context),
    };
};

export const assets = async (event: APIGatewayEvent, context: Context) => {
    if (!event.path.startsWith('/assets/')) {
        throw new Error(`File not found.`);
    }
    return fileHandler.get(event, context);
};
