import {Elements, PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import {loadStripe, PaymentRequest, StripeElementsOptions,} from '@stripe/stripe-js';
import {ContentFieldProps} from '../../types';
import {useCallback, useEffect, useState} from 'react';
import {Box, HStack, useToast} from '@chakra-ui/react';
import {getInputFormikKey, getSingleFormValue, replaceTextWithInputValue} from '../../utils';
import {usePages} from '../../hooks';

const stripePromise = loadStripe(
    'pk_test_51H5lSlIHLTnuvRM7Ah4nUAVj66F8BxJRnhhRYcQcyMMUv6AjkaZSQJp0H9EvuAgqjnoS7gHHWFJxU9G3oBbc8RQm00yjqLBvfK'
);
const options: StripeElementsOptions = {
    // passing the client secret obtained from the server
    // deepcode ignore HardcodedNonCryptoSecret: Dev
    clientSecret:
        'pi_3LCy8TIHLTnuvRM704Be1RLx_secret_E7pe2S5Ve1nC2zqnY5cu15N9x',
};

interface PaymentProps extends Omit<ContentFieldProps, 'fieldKey'> {
    nameFieldKey: string;
    amount: number | string;
    label: string;
}

export const ContentPaymentComponent = (props: PaymentProps) => {
    const [name, setName] = useState<string | null>(null);

    const {amount, label, form, nameFieldKey} = props
    const {inputs, calculations, pageState: {actions, state: {currentIndex}}} = usePages();
    const key = getInputFormikKey('payment', currentIndex) + '.input';
    const stripe = useStripe();
    const elements = useElements();
    const toast = useToast()

    const [value, setValue] = useState<number>(0);
    const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(
        null
    );

    const onSubmit = useCallback(async () => {
        if (!stripe || !elements) {
            toast({
                title: 'Error',
                description: "Payment provider not loaded.",
                status: 'error',
                duration: 5000,
                isClosable: false,
                position: 'top'
            })
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return false;
        }

        if (!name) {
            toast({
                title: 'Error',
                description: "Missing name from previous page.",
                status: 'error',
                duration: 5000,
                isClosable: false,
                position: 'top'
            })
            return false;
        }


        const cardElement = elements.getElement("card");
        if (!cardElement) {
            toast({
                title: 'Error',
                description: "Payment element missing.",
                status: 'error',
                duration: 5000,
                isClosable: false,
                position: 'top'
            })
            return false;
        }

        cardElement.update({disabled: true})

        const {error} = await stripe.confirmCardPayment("", {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name
                }
            }
        })
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error && (error.type === "card_error" || error.type === "validation_error")) {

            toast({
                title: 'Error',
                description: "Encountered a processing issue.",
                status: 'error',
                duration: 5000,
                isClosable: false,
                position: 'top'
            })
        } else {
            //
        }
        cardElement.update({disabled: false})
        return true;
    }, [elements, name, stripe])

    useEffect(() => {
        let amt: number;
        if (typeof amount === 'string') {
            amt = Number(
                replaceTextWithInputValue(amount, inputs, calculations, form)
            );
            if (Number.isNaN(amt)) {
                console.error(
                    "Couldn't calculate the value of `amount` provided to `ContentPayment`.",
                    {provided: amount, calculated: amt}
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

    useEffect(() => {
        const nameFullKey = inputs.get(nameFieldKey);
        if (!nameFullKey) return;
        const value = getSingleFormValue(nameFullKey, form)?.value;
        setName(value);
    }, [form, inputs, nameFieldKey])

    useEffect(() => {
        // Register onSubmit to ensure pressing the Next button will call the onSubmit function.
        actions.registerNextHandler(() => onSubmit());
        actions.registerBackHandler(() => {
            form.setFieldValue(key, {value: {input: false}});
            return true;
        })
    }, []);

    const handleChange = (complete: boolean) => {
        if (complete) {
            form.setFieldValue(key, {value: {input: true}});
            actions.setCanGoNext.on()
        } else {
            form.setFieldValue(key, {value: {input: false}});
            actions.setCanGoNext.off()
        }
    }

    return (
        <>
            <HStack spacing={1} mb="8">
                <Box>You're paying</Box>
                <Box fontWeight={'800'}>${(value / 100).toFixed(2)} AUD</Box>
                {/* <Button variant="link">change</Button> */}
            </HStack>

            <PaymentElement
                onChange={evt => handleChange(evt.complete)}
                options={{
                    fields: {
                        billingDetails: {
                            name: "never",
                            email: "never",
                            phone: "never",
                            address: "never"
                        }
                    }
                }}

            />
        </>
    );
};

export const ContentPayment = (props: PaymentProps) => {
    const [stripe,] = useState(stripePromise)
    return (
        <Box w="100%">
            <Elements {...{options, stripe}}>
                <ContentPaymentComponent {...props} />
            </Elements>
        </Box>
    );
};
