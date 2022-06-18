import { Box, Checkbox, HStack } from '@chakra-ui/react';

interface ItemProps {
    title: string;
    completed?: {
        completedBy: string;
        completedAt: string;
        anonymous: boolean;
    } | null;
    completionText?: string;
    onChange: (val: boolean) => void;
    isSelected?: boolean;
}

export const Item = ({
    title,
    completed = null,
    completionText = 'Completed',
    onChange,
    isSelected = false,
}: ItemProps) => {
    return (
        <Box opacity={completed ? 0.7 : 1}>
            <HStack>
                <Checkbox
                    disabled={!!completed}
                    isChecked={isSelected || !!completed}
                    onChange={(e) => onChange(e.currentTarget.checked)}
                />
                <Box textDecoration={completed ? 'line-through' : undefined}>
                    {title}
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
