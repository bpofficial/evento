import { Box, Button, HStack } from '@chakra-ui/react';
import { BsArrowRight } from 'react-icons/bs';
import { usePages } from '../../hooks';

export const NextButton = () => {
    const { pageState } = usePages();

    if (!pageState) return null;
    const { state, currentPage, actions, isLoading } = pageState;
    const { text, hideIcon, hide } =
        (currentPage as any)?.options?.primaryButton ?? {};

    if (hide) return null;

    return (
        <Button
            w="100%"
            h="14"
            mt="6"
            onClick={actions.nextPage}
            disabled={!state.canGoNext}
            {...{ isLoading }}
        >
            <HStack>
                <Box>{text || (state.isLastPage ? 'Submit' : 'Next')}</Box>
                {!hideIcon ? <BsArrowRight /> : null}
            </HStack>
        </Button>
    );
};
