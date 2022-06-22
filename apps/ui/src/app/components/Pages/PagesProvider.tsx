import { Flex, VStack } from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { NextButton } from './NextButton';
import { BackButton } from './BackButton';
import { PageOptions } from '../../types';
import { registerInputs } from '../../utils';
import { createPageProps, usePagesState, PagesContext } from '../../hooks';

export interface PagesProviderProps {
    pages: PageOptions[];
    calculations: Record<string, any>;
}

export const PagesProvider = ({ pages, calculations }: PagesProviderProps) => {
    const inputs = registerInputs(pages, calculations);
    const info = { inputs, calculations };

    const form = useFormikContext();
    const pageState = usePagesState(pages, info);
    const props = createPageProps({ pageState, form });
    const ctx = {
        ...info,
        pages,
        pageState,
    };

    const { Component } = pageState;

    return (
        <PagesContext.Provider value={ctx}>
            <Flex
                h="100%"
                justifyContent={'space-between'}
                flexDirection="column"
            >
                <VStack alignItems="flex-start" h="100%">
                    <BackButton />
                    <Component {...props} />
                </VStack>
                <NextButton />
            </Flex>
        </PagesContext.Provider>
    );
};
