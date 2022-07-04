import {
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ContentFieldProps } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import {
    Box,
    CircularProgress,
    Flex,
    useBoolean,
    useToast,
} from '@chakra-ui/react';
import {
    getInputFormKey,
    getSingleFormValue,
    replaceTextWithInputValue,
} from '@evento/calculations';
import { usePages, usePaymentIntent } from '../../hooks';
import { useFormikContext } from 'formik';
import { FormModel } from '@evento/models';

const stripePromise = loadStripe(
    'pk_test_51H5lSlIHLTnuvRM7Ah4nUAVj66F8BxJRnhhRYcQcyMMUv6AjkaZSQJp0H9EvuAgqjnoS7gHHWFJxU9G3oBbc8RQm00yjqLBvfK'
);

interface PaymentProps extends Omit<ContentFieldProps, 'fieldKey'> {
    nameFieldKey: string;
    amount: string | number;
    label: string;
    metadata?: Record<string, string>;
}

export const ContentPaymentComponent = (props: PaymentProps) => {
    const pages = usePages();

    const { form, nameFieldKey } = props;
    const { inputs, pageState } = pages;

    const [name, setName] = useState<string | null>(null);
    const key = getInputFormKey('payment', pageState?.state?.currentIndex);
    const stripe = useStripe();
    const elements = useElements();
    const toast = useToast();

    const onSubmit = useCallback(async () => {
        if (!stripe || !elements) {
            toast({
                title: 'Error',
                description: 'Payment provider not loaded.',
                status: 'error',
                duration: 5000,
                isClosable: false,
                position: 'top',
            });
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return false;
        }

        if (!name) {
            toast({
                title: 'Error',
                description: 'Missing name from previous page.',
                status: 'error',
                duration: 5000,
                isClosable: false,
                position: 'top',
            });
            return false;
        }

        const cardElement = elements.getElement('payment');
        if (!cardElement) {
            toast({
                title: 'Error',
                description: 'Payment element missing.',
                status: 'error',
                duration: 5000,
                isClosable: false,
                position: 'top',
            });
            return false;
        }

        cardElement.update({ readOnly: true });

        const { error } = await stripe.confirmPayment({
            elements: elements,
            confirmParams: {
                return_url: '',
                payment_method_data: {
                    billing_details: {
                        name,
                    },
                },
            },
            redirect: 'if_required',
        });
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (
            error &&
            (error.type === 'card_error' || error.type === 'validation_error')
        ) {
            toast({
                title: 'Error',
                description: 'Encountered a processing issue.',
                status: 'error',
                duration: 5000,
                isClosable: false,
                position: 'top',
            });
        } else {
            if (key) {
                form.setFieldValue(key + '.paid', { value: true });
            }
        }
        cardElement.update({ readOnly: false });
        return true;
    }, [stripe, elements, name, toast, form, key]);

    useEffect(() => {
        const nameFullKey = inputs.get(nameFieldKey);
        if (!nameFullKey) return;
        const value = getSingleFormValue(nameFullKey, form.values)?.value;
        setName(value);
    }, [form, inputs, nameFieldKey]);

    useEffect(() => {
        // Register onSubmit to ensure pressing the Next button will call the onSubmit function.
        if (pageState?.actions) {
            pageState.actions.registerNextHandler(async () => onSubmit());
            if (key) {
                pageState.actions.registerBackHandler(() => {
                    form.setFieldValue(key + '.input', {
                        value: { input: false },
                    });
                    return true;
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stripe, elements]);

    const handleChange = (complete: boolean) => {
        if (pageState?.actions && key) {
            if (complete) {
                form.setFieldValue(key + '.input', { value: true });
                pageState.actions.setCanGoNext.on();
            } else {
                form.setFieldValue(key + '.input', { value: false });
                pageState.actions.setCanGoNext.off();
            }
        }
    };

    if (!(stripe && elements)) return null;
    return <PaymentElement onChange={(evt) => handleChange(evt.complete)} />;
};

export const ContentPayment = (props: PaymentProps) => {
    const [stripe] = useState(stripePromise);
    const [isLoading, loading] = useBoolean(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const pages = usePages();
    const form = useFormikContext<any>();
    const createPaymentIntent = usePaymentIntent();

    const { inputs, calculations } = pages;

    const model = new FormModel({
        formId: pages.formId,
        version: pages.version,
        pages: pages.pages,
        calculations,
    });

    const setupMetadata = () => {
        if (props.metadata) {
            const meta = props.metadata;
            for (const metaName in meta) {
                const key = meta[metaName];
                if (key[0] === '{') {
                    const value = replaceTextWithInputValue(
                        key,
                        inputs,
                        model?.calculations ?? {},
                        form.values
                    );
                    if (value) meta[metaName] = value;
                }
            }
            return meta;
        }
        return {};
    };

    useEffect(() => {
        if (form.values) {
            const metadata = setupMetadata();
            loading.on();
            console.log({ metadata });
            createPaymentIntent(form.values, metadata)
                .then((result) => {
                    if (result.clientSecret) {
                        setClientSecret(result.clientSecret);
                    }
                })
                .finally(() => {
                    loading.off();
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box w="100%">
            {isLoading || !clientSecret ? (
                <Flex w="100%" justifyContent="center" mt="4">
                    <CircularProgress color={'custom.500'} isIndeterminate />
                </Flex>
            ) : (
                <Elements {...{ options: { clientSecret }, stripe }}>
                    <ContentPaymentComponent {...props} />
                </Elements>
            )}
        </Box>
    );
};
