import {APIGatewayEvent} from "aws-lambda";
import {renderApplication, RenderContext} from "./render";
import {EventoApp} from "@evento/ui-bits";
import {PageModel} from "@evento/models";
import {PokerCalculations, PokerPages} from "./test-config";

export const handler = async (event: APIGatewayEvent) => {
    const context: RenderContext<typeof EventoApp> = {
        props: {
            environment: {
                api: {
                    baseUrl: ''
                }
            },
            configuration: new PageModel({
                formId: 'test',
                calculations: PokerCalculations,
                pages: PokerPages
            })
        },
        helmet: {
            title: 'Poker Night',
            bodyAttributes: 'style="position: fixed; height: 100%"'
        }
    }

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'text/html'
        },
        body: renderApplication(EventoApp, context)
    }
}
