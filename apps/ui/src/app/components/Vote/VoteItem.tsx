import { Box, Checkbox, HStack } from '@chakra-ui/react';
import { ClaimableVoteOption } from '../../types';

interface VoteItemProps extends ClaimableVoteOption {
    onChange: (val: boolean) => void;
    isSelected?: boolean;
}

export const VoteItem = ({
    name,
    completed = null,
    completionText = 'Completed',
    onChange,
    isSelected = false,
}: VoteItemProps) => {
    return (
        <Box opacity={completed ? 0.7 : 1}>
            <HStack>
                <Checkbox
                    disabled={!!completed}
                    isChecked={isSelected || !!completed}
                    onChange={(e) => onChange(e.currentTarget.checked)}
                />
                <Box textDecoration={completed ? 'line-through' : undefined}>
                    {name}
                </Box>
                {completed ? (
                    <Box fontStyle="italic">
                        {completed.anonymous
                            ? completionText
                            : `${completionText} by ${completed.completedBy}`}
                    </Box>
                ) : null}
            </HStack>
        </Box>
    );
};
