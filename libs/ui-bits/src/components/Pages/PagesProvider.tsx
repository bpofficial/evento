import { Flex, VStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { NextButton } from './NextButton';
import { BackButton } from './BackButton';
import {
    createPageProps,
    PagesContext,
    usePagesState,
    useSubmit,
} from '../../hooks';
import { useMemo } from 'react';
import { registerInputs } from '@evento/calculations';
import { AppProps } from '../../evento';

export interface PagesProviderProps {
    configuration: AppProps['configuration'];
}

export const PagesProvider = ({ configuration }: PagesProviderProps) => {
    console.log({ configuration });
    const { formId, version, pages, calculations, validations } =
        configuration ?? {};
    const submitFn = useSubmit(formId);
    const inputs = registerInputs(pages, calculations);
    const info = { inputs, calculations, validations };

    const form = useFormikContext();
    const pageState = usePagesState(pages, info);
    const props = useMemo(() => {
        return createPageProps({ pageState, form });
    }, [form, pageState]);

    const ctx = {
        ...info,
        pages,
        pageState,
        submitFn,
        formId,
        version,
    } as any;

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
