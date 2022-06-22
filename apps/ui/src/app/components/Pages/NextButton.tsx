import { Box, Button, HStack } from '@chakra-ui/react';
import { BsArrowRight } from 'react-icons/bs';
import { usePages } from '../../hooks/pageContext';

export const NextButton = () => {
    const {
        pageState: { state, currentPage, actions },
    } = usePages();

    return (
        <Button
            w="100%"
            h="14"
            mt="6"
            onClick={actions.nextPage}
            disabled={!state.canGoNext}
        >
            <HStack>
                <Box>
                    {currentPage.buttonText ||
                        (state.isLastPage ? 'Submit' : 'Next')}
                </Box>
                <BsArrowRight />
            </HStack>
        </Button>
    );
};
