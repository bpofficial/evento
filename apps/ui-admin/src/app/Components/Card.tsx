import {ComponentProps, MouseEvent} from "react";
import {Box, Button, HStack} from "@chakra-ui/react";
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
    index?: number;
    isSourceDrag?: boolean;
}

interface CardPropsWithHandlers extends CardProps {
    onMove?: (dragIndex: number, hoverIndex: number) => void;
    onClick: (item: CardProps) => void;
    onDelete?: (index: number) => (evt: MouseEvent<HTMLButtonElement>) => void;
}

export const Card = ({onMove, onClick, onDelete, ...props}: CardPropsWithHandlers) => {
    const {title, isSourceDrag = true} = props;
    const {drag, drop, ref} = useDragToSort(props, {
        type: () => isSourceDrag ? 'card' : 'config-card',
        dropAccept: ['config-card'],
        onMove
    });

    const opacity = drag.isDragging ? (isSourceDrag ? 0.8 : 0) : 1;
    return (
        <Box {...{opacity, ref, ...BOX_PROPS}} onClick={() => onClick(props)} data-handler-id={drop.handlerId}>
            <HStack w={"100%"} justifyContent={"space-between"}>
                <Box userSelect={'none'}>{title}</Box>
                {onDelete ?
                    <Button
                        onClick={onDelete(props.index ?? -1)}
                        zIndex={10}
                        variant={"ghost"}
                        colorScheme={"red"}
                        px={2}
                        h={"8"}
                    >
                        delete
                    </Button> : null}
            </HStack>
        </Box>
    );
};
