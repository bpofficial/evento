import { Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { ItemList } from '../components/ItemList';
import { BsArrowRight } from 'react-icons/bs';
import { useState } from 'react';
import { useMemo } from 'react';

const bits = [
    {
        title: 'Choose a single option',
        options: ['Pizza', 'Drinks', 'Snacks'],
    },
    {
        title: 'Vote for an activity',
        options: [
            'Secret Hitler',
            'Nintendo Switch',
            'XBox 360',
            'Cards against Humanity',
            'Captain Sonar',
            'Dune',
        ],
    },
];

export const MultiVote = () => {
    const [edited, setEdited] = useState<boolean[]>(bits.map(() => false));

    const onEdit = (idx: number) => () => {
        const newEdited = [...edited];
        newEdited[idx] = true;
        setEdited(newEdited);
    };

    const canSubmit = useMemo(() => edited.every((v) => v === true), [edited]);

    return (
        <Flex h="100%" justifyContent={'space-between'} flexDirection="column">
            <VStack spacing={12} alignItems="flex-start">
                {bits.map(({ title, options }, key) => (
                    <VStack alignItems="flex-start" {...{ key }}>
                        <Heading size="lg">{title}</Heading>
                        <ItemList items={options} onEdit={onEdit(key)} />
                    </VStack>
                ))}
            </VStack>
            <Button w="100%" h="14" mt="6" disabled={!canSubmit}>
                Submit
                <BsArrowRight style={{ marginLeft: '8px', marginTop: '1px' }} />
            </Button>
        </Flex>
    );
};
