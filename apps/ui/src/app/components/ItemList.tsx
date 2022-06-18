import { VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Item } from './Item';

interface ItemListProps {
    items: any[];
    onEdit: () => void;
}

export const ItemList = ({ items, onEdit }: ItemListProps) => {
    const [edit, setEdit] = useState<{
        key: string | number;
        value: boolean;
    }>();

    const onChange = (key: string | number) => (value: boolean) => {
        setEdit({ key, value });
        onEdit();
    };

    return (
        <VStack alignItems="flex-start" spacing={4}>
            {items.map((title, key) => (
                <Item
                    {...{ key, title }}
                    completionText="Bought"
                    onChange={onChange(key)}
                    isSelected={edit?.key === key}
                />
            ))}
        </VStack>
    );
};
