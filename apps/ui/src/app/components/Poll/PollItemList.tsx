import { VStack } from '@chakra-ui/react';
import { divide } from '@evento/utils';
import { useChecked, CheckedOption } from '../../hooks';
import { PollOption } from '../../types';
import { PollItem } from './PollItem';

interface PollItemListProps {
    total: number;
    items: PollOption[];
    onEdit: (id: string) => void;
    currentEdit?: CheckedOption;
}

export const PollItemList = ({
    items,
    total,
    onEdit,
    currentEdit,
}: PollItemListProps) => {
    const { checked, onChange } = useChecked(onEdit, currentEdit);

    return (
        <VStack alignItems="flex-start" spacing={4} w="100%">
            {items.map((props, key) => (
                <PollItem
                    {...{ key, ...props, total }}
                    onChange={onChange(props.id)}
                    isSelected={checked?.key === props.id}
                />
            ))}
        </VStack>
    );
};
