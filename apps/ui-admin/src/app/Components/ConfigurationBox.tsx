/* eslint-disable react-hooks/exhaustive-deps */
import {Box, Heading, VStack,} from '@chakra-ui/react';
import {useCallback, useState} from 'react';
import update from 'immutability-helper';
import {useDrop} from 'react-dnd';
import {box, dims} from "../constants";
import {Card, CardProps} from "./Card";

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

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex]],
                ],
            }));
    }, []);

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

    const renderCard = useCallback(
        (props: CardProps, index: number) => (
            <Card
                {...{
                    index,
                    key: props.id,
                    ...props,
                    moveCard,
                    isSourceDrag: false,
                }}
            />
        ),
        []
    );

    return (
        <VStack {...dims} align="left">
            <Heading size="md">Configuration</Heading>
            <Box {...box} p="2">
                <Box {...dims} ref={dropRef}>
                    {cards.map((c, i) => <Card
                        {...{
                            index: i,
                            key: c.id,
                            ...c,
                            moveCard,
                            isSourceDrag: false,
                        }}
                    />)}
                </Box>
            </Box>
        </VStack>
    );
};
