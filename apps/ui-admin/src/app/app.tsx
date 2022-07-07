import { Box, ChakraProvider, Heading, HStack, VStack } from '@chakra-ui/react';
import { FormModel } from '@evento/models';
import { EventoApp } from '@evento/ui-bits';
import { useCallback, useRef, useState } from 'react';
import update from 'immutability-helper';
import { DndProvider, useDrag, useDrop, XYCoord } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const w = '100%';
const h = '100%';
const dims = { w, h };
const box = { ...dims, borderWidth: 1, borderRadius: 4 };
const defaultPage: any = { type: 'CustomContent', options: { content: [] } };

// On Config-Card press, change Elements to Card Properties to allow easy editing

interface CardProps {
    title: string;
    type: string;
    icon?: string;
    isSourceDrag?: boolean;
    index?: number;
    moveCard?: (dragIndex: number, hoverIndex: number) => void;
}

const Card = ({ moveCard, ...props }: CardProps) => {
    const { title, isSourceDrag = true, index } = props;
    const ref = useRef<HTMLDivElement>(null);

    const [{ opacity }, drag] = useDrag(
        () => ({
            type: isSourceDrag ? 'card' : 'config-card',
            item: props,
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? (isSourceDrag ? 0.5 : 0) : 1,
            }),
        }),
        []
    );

    const [{ handlerId }, drop] = useDrop<
        CardProps,
        void,
        { handlerId: string | symbol | null }
    >(() => ({
        accept: 'config-card',
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (
                typeof dragIndex !== 'number' ||
                typeof hoverIndex !== 'number' ||
                dragIndex === hoverIndex ||
                !moveCard
            ) {
                return;
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            // Get pixels to the top
            const hoverClientY =
                (clientOffset as XYCoord).y - hoverBoundingRect.top;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            // item.index = hoverIndex;
        },
    }));

    drag(drop(ref));

    return (
        <Box
            p="4"
            borderWidth={1}
            borderRadius={2}
            w="100%"
            mb="2"
            userSelect={'none'}
            cursor="pointer"
            {...{ opacity }}
            ref={ref}
            data-handler-id={handlerId}
        >
            <HStack>
                <Box userSelect={'none'}>{title}</Box>
            </HStack>
        </Box>
    );
};

const ConfigurationBox = () => {
    const [cards, setCards] = useState<CardProps[]>([]);

    const onDrop = (drop: CardProps) => {
        setCards((prevCards) => prevCards.concat([drop]));
    };

    const moveCard = (dragIndex: number, hoverIndex: number) => {
        const dragItem = cards[dragIndex];
        if (dragItem) {
            setCards((prevCards) => {
                const copy = [...prevCards];
                const prevItem = copy.splice(hoverIndex, 1, dragItem);
                copy.splice(dragIndex, 1, prevItem[0]);
                return copy;
            });
        }
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

    const renderCard = useCallback(
        (props: CardProps, index: number) => (
            <Card
                {...{
                    ...props,
                    index,
                    isSourceDrag: false,
                    moveCard,
                    key: index,
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
                    {cards.map((props, key) => renderCard(props, key))}
                </Box>
            </Box>
        </VStack>
    );
};

export function App() {
    const [model, setModel] = useState(
        new FormModel({
            pages: [defaultPage],
        })
    );

    return (
        <ChakraProvider>
            <Box h="100%" w="100vw">
                <Box p="8" {...dims}>
                    <DndProvider backend={HTML5Backend}>
                        <HStack {...dims}>
                            <VStack {...dims} align="left">
                                <Heading size="md">Elements</Heading>
                                <Box
                                    {...box}
                                    p="2"
                                    h="100%"
                                    overflowY={'scroll'}
                                >
                                    <Card title="Text" type="ContentText" />
                                    <Card
                                        title="Heading"
                                        type="ContentHeading"
                                    />
                                    <Card
                                        title="Spacing"
                                        type="ContentSpacing"
                                    />
                                    <Card
                                        title="Form Input"
                                        type="ContentInput"
                                    />
                                    <Card title="Select" type="ContentSelect" />
                                    <Card
                                        title="MultiSelect"
                                        type="ContentMultiSelect"
                                    />
                                    <Card title="Poll" type="ContentPoll" />
                                    <Card
                                        title="Poll Group"
                                        type="ContentPollGroup"
                                    />
                                    <Card
                                        title="Checkbox"
                                        type="ContentCheckbox"
                                    />
                                    <Card
                                        title="Checkbox Group"
                                        type="ContentCheckboxGroup"
                                    />
                                    <Card title="URL Link" type="ContentLink" />
                                    <Card
                                        title="Payment Processing"
                                        type="ContentPayment"
                                    />
                                </Box>
                            </VStack>
                            <ConfigurationBox />
                            <VStack {...dims} align="left">
                                <Heading size="md">Preview</Heading>
                                <Box {...box}>
                                    <EventoApp
                                        configuration={model.toJSON()}
                                        preview
                                    />
                                </Box>
                            </VStack>
                        </HStack>
                    </DndProvider>
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default App;
