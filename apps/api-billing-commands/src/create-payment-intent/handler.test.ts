import {APIGatewayEvent} from "aws-lambda";
import {handler} from "./handler";

jest.mock('stripe', () => {
    return {
        default: jest.fn().mockImplementation(() => ({
            paymentIntents: {
                create: jest.fn(() => Promise.resolve({client_secret: "testclientsecret"}))
            }
        }))
    }
})

describe('CreatePaymentIntent', () => {

    const event: APIGatewayEvent = {
        body: JSON.stringify({
            key: '{{payableAmount}}',
            fields: {
                "0_CustomContent": {
                    "name": {
                        "value": "TEST"
                    }
                },
                "1_CustomContent": {
                    "gettingPizza": {
                        "id": "1",
                        "label": "Yes",
                        "value": true
                    }
                },
                "2_CustomContent": {
                    "payment": {
                        "input": {
                            "value": true
                        },
                        "paid": {
                            "value": true
                        }
                    }
                }
            }
        })
    } as any;

    it('should create a payment intent', async () => {
        const result = await handler(event);
        const body = JSON.parse(result.body);

        expect(result.statusCode).toBe(200)
        expect(body).toStrictEqual({
            clientSecret: "testclientsecret",
            amount: 500
        })
    })
})
