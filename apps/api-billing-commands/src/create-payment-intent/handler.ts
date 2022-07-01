import { APIGatewayEvent } from 'aws-lambda';
import { formatError, formatResponse } from '@evento/api-utils';
import Stripe from 'stripe';
import { FormModel } from '@evento/models';
import { TestConfig } from './test-config';
import { config } from '../../config';

const stripe = new Stripe(config.stripe.apiKey, {
    apiVersion: '2020-08-27',
});

/**
 * The client will send the current form values & a payment form field key,
 * this function will calculate - based off of the values and
 * the stored pages for the given formId - the charge.
 */
export async function handler(event: APIGatewayEvent) {
    // POST /api/v1/billing/checkout?formId=xyz&formVersion=1
    const formId = event.queryStringParameters?.formId;
    const formVersion = event.queryStringParameters?.formVersion ?? null; // used to ensure the correct version of a form is used for billing.

    if (!formId) {
        return formatError(
            'Bad Request',
            `Expected missing field 'formId' of type string.`
        );
    }
    if (!formVersion) {
        return formatError(
            'Bad Request',
            `Expected missing field 'formVersion' of type string.`
        );
    }

    // const api = new EventoApi({
    //     gatewayUrl: config.api.baseUrl
    // })
    // const result = await api.forms.retrieve(pageId, pageVersion);
    // if (isLeft(result)) {
    //     return formatError('Internal Server Error', result.left.message, 500);
    // }
    // const pageConfig = result.right;
    const formConfig = new FormModel({
        pages: TestConfig.Pages,
        calculations: TestConfig.Calculations,
        validations: TestConfig.Validations,
    });

    let fields: Record<string, any>, metadata: Record<string, string>;
    try {
        let result: any;
        try {
            result = JSON.parse(event.body);
        } catch (error) {
            throw new Error('Failed to parse body.');
        }
        if (!result.fields) throw new Error('Missing form fields.');

        metadata = result.metadata ?? {};
        fields = result.fields;
    } catch (error) {
        return formatError('Bad Request', error.message, 400);
    }

    const amount = formConfig.getPaymentAmount(fields);
    if (!amount) {
        return formatError(
            'Bad Request',
            'Failed to parse form and retrieve payable amount.',
            400
        );
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'aud',
        automatic_payment_methods: {
            enabled: true,
        },
        metadata,
    });

    return formatResponse({
        clientSecret: paymentIntent.client_secret,
        amount,
    })(200);
}
