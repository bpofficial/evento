import {Flex, VStack} from '@chakra-ui/react';
import {useFormikContext} from 'formik';
import {NextButton} from './NextButton';
import {BackButton} from './BackButton';
import {PageOptions} from '../../types';
import {registerInputs} from '../../utils';
import {createPageProps, PagesContext, usePagesState} from '../../hooks';
import {useMemo} from "react";

export interface PagesProviderProps {
    pages: PageOptions[];
    calculations: Record<string, any>;
}

export const PagesProvider = ({pages, calculations}: PagesProviderProps) => {
    const inputs = registerInputs(pages, calculations);
    const info = {inputs, calculations};

    const form = useFormikContext();
    const pageState = usePagesState(pages, info);
    const props = useMemo(() => {
        return createPageProps({pageState, form})
    }, [form, pageState]);

    const ctx = {
        ...info,
        pages,
        pageState,
    };

    const {Component, transitioning} = pageState;

    return (
        <PagesContext.Provider value={ctx}>
            <Flex
                h="100%"
                justifyContent={'space-between'}
                flexDirection="column"
            >
                <VStack alignItems="flex-start" h="100%">
                    <BackButton/>
                    {!transitioning ? <Component {...props} /> : null}
                </VStack>
                <NextButton/>
            </Flex>
        </PagesContext.Provider>
    );
};
