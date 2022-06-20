import { Heading, VStack } from '@chakra-ui/react';
import { ItemList } from '../components/ItemList';
import { useEffect, useState } from 'react';
import { Vote } from './SimpleVote';
import { CanGoNext } from '../types';

interface MultiVoteProps extends CanGoNext {
    options: Vote[];
}

export const MultiVote = ({ options, onCanGoNext, form }: MultiVoteProps) => {
    const [edited, setEdited] = useState<boolean[]>(options.map(() => false));

    const onEdit = (idx: number) => () => {
        const newEdited = [...edited];
        newEdited[idx] = true;
        setEdited(newEdited);
    };

    useEffect(() => {
        if (edited.every((v) => v)) {
            onCanGoNext();
        }
    }, [edited, onCanGoNext]);

    return (
        <VStack spacing={12} alignItems="flex-start">
            {options.map(({ title, options: opts }, key) => (
                <VStack alignItems="flex-start" {...{ key }}>
                    <Heading size="lg">{title}</Heading>
                    <ItemList items={opts} onEdit={onEdit(key)} />
                </VStack>
            ))}
        </VStack>
    );
};
