import { Box, Checkbox, Flex, HStack, Progress } from '@chakra-ui/react';
import { divide } from '@evento/utils';
import { PollOption } from '../../../types';

interface PollItemProps extends PollOption {
    onChange: (val: boolean) => void;
    isSelected?: boolean;
    totalPolls: number;
}

export const PollItem = ({
    label,
    count,
    totalPolls,
    onChange,
    isSelected = false,
}: PollItemProps) => {
    const progress = divide(count + (isSelected ? 1 : 0), totalPolls) ?? 0;

    return (
        <Flex w="100%" mt="2" position="relative">
            <HStack flex={1} w="100%">
                <Checkbox
                    isChecked={isSelected}
                    onChange={(e) => onChange(e.currentTarget.checked)}
                    zIndex={9999}
                    borderColor="purple.300"
                />
                <Box>{label}</Box>
            </HStack>
            <Progress
                borderRadius="sm"
                colorScheme={'custom'}
                opacity={0.15}
                position="absolute"
                value={progress * 100}
                flex={1}
                w="100%"
                h="8"
                size="lg"
                ml="-2"
                mt="-1"
            />
        </Flex>
    );
};
