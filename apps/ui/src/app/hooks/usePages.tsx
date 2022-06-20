import { PageOptions } from '../types/pages';
import { Box, Button, Flex, HStack, VStack } from '@chakra-ui/react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useFormik } from 'formik';
import { PagesContext } from './pageContext';
import { createPageProps, usePagesState } from './usePagesState';

export interface PagesProviderProps {
    pages: PageOptions[];
}

export const PagesProvider = ({ pages }: PagesProviderProps) => {
    const { CurrentPage, screen, actions, state } = usePagesState(pages);
    const form = useFormik({ initialValues: {}, onSubmit: console.log });
    const props = createPageProps({ state, screen, actions, form });
    const ctx = { pages, ...actions, currentPage: screen };

    return (
        <PagesContext.Provider value={ctx}>
            <Flex
                h="100%"
                justifyContent={'space-between'}
                flexDirection="column"
            >
                <VStack alignItems="flex-start">
                    {!state.isFirstPage && (
                        <HStack mb="2" onClick={actions.previousPage}>
                            <BsArrowLeft />
                            <Box fontWeight="600">Back</Box>
                        </HStack>
                    )}
                    {screen.title}
                    <CurrentPage {...props} />
                </VStack>
                <Button
                    w="100%"
                    h="14"
                    mt="6"
                    onClick={actions.nextPage}
                    disabled={!state.canGoNext}
                >
                    <HStack onClick={actions.previousPage}>
                        <Box>{state.isLastPage ? 'Submit' : 'Next'}</Box>
                        <BsArrowRight />
                    </HStack>
                </Button>
            </Flex>
        </PagesContext.Provider>
    );
};
