import { Box, Spacer } from '@chakra-ui/react';

interface ContentSpacingProps {
    height: string;
}

export const ContentSpacing = ({ height }: ContentSpacingProps) => {
    return (
        <Box w="100%">
            <Spacer {...{ height }} />
        </Box>
    );
};
