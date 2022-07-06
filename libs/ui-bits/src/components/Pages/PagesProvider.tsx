import { Flex, VStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { NextButton } from './NextButton';
import { BackButton } from './BackButton';
import {
    createPageProps,
    PagesContext,
    useModel,
    usePagesState,
    useSubmit,
} from '../../hooks';
import { useMemo } from 'react';

export const PagesProvider = ({ preview = false }) => {
    const model = useModel();
    const inputs = model.getInputs();

    const submitFn = useSubmit(preview);
    const form = useFormikContext();
    const pageState = usePagesState(inputs);

    const props = useMemo(() => {
        return createPageProps({ pageState, form });
    }, [form, pageState]);

    const ctx = { inputs, pageState, submitFn, preview } as any;

    const { Component, transitioning } = pageState ?? {};

    return (
        <PagesContext.Provider value={ctx}>
            <Flex
                h="100%"
                justifyContent={'space-between'}
                flexDirection="column"
            >
                <VStack alignItems="flex-start" h="100%">
                    <BackButton />
                    {!transitioning && Component ? (
                        <Component {...props} />
                    ) : null}
                </VStack>
                <NextButton />
            </Flex>
        </PagesContext.Provider>
    );
};
