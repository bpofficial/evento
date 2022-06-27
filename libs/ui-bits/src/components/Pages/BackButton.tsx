import { Box, HStack } from '@chakra-ui/react';
import { BsArrowLeft } from 'react-icons/bs';
import { usePages } from '../../hooks';

export const BackButton = () => {
    const { pageState } = usePages();

    if (!pageState) return null;
    const { state, actions, currentPage } = pageState;

    const { hide } = (currentPage as any)?.options?.backButton ?? {};

    if (state.isFirstPage || hide) return null;

    return (
        <HStack mb="2" onClick={actions.previousPage}>
            <BsArrowLeft />
            <Box fontWeight="600">Back</Box>
        </HStack>
    );
};
