import {ComponentProps} from "react";
import {Box, HStack} from "@chakra-ui/react";
import {useDragToSort} from "../hooks/useDragToSort";

const BOX_PROPS: ComponentProps<typeof Box> = {
    p: '4',
    borderWidth: 1,
    borderRadius: 2,
    w: '100%',
    mb: '2',
    userSelect: 'none',
    cursor: 'pointer'
}

export interface CardProps {
    id?: string;
    title: string;
    type: string;
    icon?: string;
    isSourceDrag?: boolean;
    index?: number;
    moveCard?: (dragIndex: number, hoverIndex: number) => void;
}

export const Card = ({moveCard, ...props}: CardProps) => {
    const {title, isSourceDrag = true} = props;
    const {drag, drop, ref} = useDragToSort(props, {
        type: () => isSourceDrag ? 'card' : 'config-card',
        dropAccept: ['config-card'],
        onMove: moveCard
    });

    const opacity = drag.isDragging ? (isSourceDrag ? 0.8 : 0) : 1;
    return (
        <Box {...{opacity, ref, ...BOX_PROPS}} data-handler-id={drop.handlerId}>
            <HStack>
                <Box userSelect={'none'}>{title}</Box>
            </HStack>
        </Box>
    );
};
