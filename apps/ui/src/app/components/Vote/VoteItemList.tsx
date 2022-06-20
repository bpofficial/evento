import { VStack } from '@chakra-ui/react';
import { CheckedOption, useChecked } from '../../hooks';
import { ClaimableVoteOption } from '../../types';
import { VoteItem } from './VoteItem';

interface VoteItemListProps {
    items: ClaimableVoteOption[];
    onEdit: (id: string) => void;
    currentEdit?: CheckedOption;
}

export const VoteItemList = ({
    items,
    onEdit,
    currentEdit,
}: VoteItemListProps) => {
    const { checked, onChange } = useChecked(onEdit, currentEdit);

    return (
        <VStack alignItems="flex-start" spacing={4}>
            {items.map((props, key) => (
                <VoteItem
                    {...{ key, ...props }}
                    completionText="Bought"
                    onChange={onChange(props.id)}
                    isSelected={checked?.key === props.id}
                />
            ))}
        </VStack>
    );
};
