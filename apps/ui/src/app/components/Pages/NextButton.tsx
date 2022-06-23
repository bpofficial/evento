import {Box, Button, HStack} from '@chakra-ui/react';
import {BsArrowRight} from 'react-icons/bs';
import {usePages} from '../../hooks';

export const NextButton = () => {
    const {
        pageState: {state, currentPage, actions, isLoading},
    } = usePages();
    
    return (
        <Button
            w="100%"
            h="14"
            mt="6"
            onClick={actions.nextPage}
            disabled={!state.canGoNext}
            {...{isLoading}}
        >
            <HStack>
                <Box>
                    {currentPage.buttonText ||
                        (state.isLastPage ? 'Submit' : 'Next')}
                </Box>
                {!currentPage.hideIcon ? <BsArrowRight/> : null}
            </HStack>
        </Button>
    );
};
