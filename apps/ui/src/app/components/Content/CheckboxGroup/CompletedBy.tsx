import { Box } from '@chakra-ui/react';

interface CompletedByProps {
    completionText: string;
    anonymous?: boolean;
    completedBy?: string;
    completedAt?: string | Date;
}

export const CompletedBy = ({
    anonymous,
    completionText,
    completedBy,
    completedAt,
}: CompletedByProps) => {
    return (
        <Box fontStyle="italic">
            {anonymous ? completionText : `${completionText} ${completedBy}`}
        </Box>
    );
};
