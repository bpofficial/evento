import {
    Elements,
    useStripe,
    PaymentElement,
    PaymentRequestButtonElement,
} from '@stripe/react-stripe-js';
import {
    loadStripe,
    PaymentRequest,
    StripeElementsOptions,
} from '@stripe/stripe-js';
import { PageForm, PageProps } from '../../types';
import { useEffect } from 'react';
import { useState } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { replaceTextWithInputValue } from '../../utils';
import { usePages } from '../../hooks/pageContext';

const stripePromise = loadStripe(
    'pk_test_51H5lSlIHLTnuvRM7Ah4nUAVj66F8BxJRnhhRYcQcyMMUv6AjkaZSQJp0H9EvuAgqjnoS7gHHWFJxU9G3oBbc8RQm00yjqLBvfK'
);
const options: StripeElementsOptions = {
    // passing the client secret obtained from the server
    // deepcode ignore HardcodedNonCryptoSecret: Dev
    clientSecret:
        'pi_3LCy8TIHLTnuvRM704Be1RLx_secret_E7pe2S5Ve1nC2zqnY5cu15N9x',
};

interface PaymentProps extends PageProps, PageForm {
    amount: number | string;
    label: string;
}

export const ContentPaymentComponent = ({
    label,
    amount,
    page,
    form,
}: PaymentProps) => {
    const { inputs, calculations } = usePages();
    const stripe = useStripe();

    const [value, setValue] = useState<number>(0);
    const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
        null
    );

    useEffect(() => {
        let amt: number;
        if (typeof amount === 'string') {
            amt = Number(
                replaceTextWithInputValue(amount, inputs, calculations, form)
            );
            if (Number.isNaN(amt)) {
                console.error(
                    "Couldn't calculate the value of `amount` provided to `ContentPayment`.",
                    { provided: amount, calculated: amt }
                );
                return;
            }
        } else {
            amt = amount;
        }
        setValue(amt);
    }, [amount, calculations, form, inputs]);

    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'AU',
                currency: 'aud',
                total: {
                    label,
                    amount: value,
                },
            });

            // Check the availability of the Payment Request API.
            pr.canMakePayment()
                .then((result) => result && setPaymentRequest(pr))
                .catch(console.warn);
        }
    }, [amount, label, stripe, value]);

    return (
        <>
            <HStack spacing={1} mb="8">
                <Box>You're paying</Box>
                <Box fontWeight={'800'}>${(value / 100).toFixed(2)} AUD</Box>
                {/* <Button variant="link">change</Button> */}
            </HStack>

            <PaymentElement
                options={{
                    wallets: { applePay: 'auto', googlePay: 'auto' },
                    fields: { billingDetails: 'never' },
                }}
            />
            {paymentRequest && (
                <PaymentRequestButtonElement options={{ paymentRequest }} />
            )}
        </>
    );
};

export const ContentPayment = (props: PaymentProps) => {
    return (
        <Box w="100%">
            <Elements stripe={stripePromise} {...{ options }}>
                <ContentPaymentComponent {...props} />
            </Elements>
        </Box>
    );
};
