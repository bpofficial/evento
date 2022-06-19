import { Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { ItemList } from '../components/ItemList';
import { BsArrowRight } from 'react-icons/bs';
import { useState } from 'react';
import { useMemo } from 'react';
import { Vote } from './SimpleVote';

interface MultiVoteProps {
    options: Vote[];
}

export const MultiVote = ({ options }: MultiVoteProps) => {
    const [edited, setEdited] = useState<boolean[]>(options.map(() => false));

    const onEdit = (idx: number) => () => {
        const newEdited = [...edited];
        newEdited[idx] = true;
        setEdited(newEdited);
    };

    const canSubmit = useMemo(() => edited.every((v) => v === true), [edited]);

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
