/* eslint-disable react-hooks/exhaustive-deps */
import {Box, Heading, VStack,} from '@chakra-ui/react';
import {useState} from 'react';
import update from 'immutability-helper';
import {useDrop} from 'react-dnd';
import {box, dims} from "../constants";
import {Card, CardProps} from "../components/Card";

// On Config-Card press, change Elements to Card Properties to allow easy editing

export const ConfigurationBox = () => {
    const [cards, setCards] = useState<CardProps[]>([]);

    const onDrop = (drop: CardProps) => {
        setCards((prevCards) => {
            return prevCards.concat([{
                ...drop,
                id: `${drop.type}-${cards.length}`
            }]);
        });
    };

    /**
     * @param dragIndex Index of the item being dragged
     * @param hoverIndex Index of the item that the dragged item is hovering
     */
    const moveCard = (dragIndex: number, hoverIndex: number) => {
        setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ]
            }));
    };

    const [, dropRef] = useDrop(
        () => ({
            accept: ['card'],
            drop(_item: CardProps, monitor) {
                monitor.getItemType() === 'card' && onDrop(_item);
                return undefined;
            },
        }),
        [onDrop]
    );

    console.log(cards)

    return (
        <VStack {...dims} align="left">
            <Heading size="md">Configuration</Heading>
            <Box {...box} p="2">
                <Box {...dims} ref={dropRef}>
                    {cards.map((c, i) => <Card index={i} key={c.id} moveCard={moveCard} isSourceDrag={false} {...c} />)}
                </Box>
            </Box>
        </VStack>
    );
};
