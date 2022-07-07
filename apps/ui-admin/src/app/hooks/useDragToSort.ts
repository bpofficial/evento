import {LegacyRef, useRef} from "react";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {CardProps} from "../Components/Card";

type OnMove = (dragIndex: number, hoverIndex: number) => void;

interface Options {
    onMove?: OnMove;
    type: string | (() => string)
    dropAccept: string[];
}

type Item<T> = T & { index?: number };

export function useDragToSort<T>(item: Item<T>, options: Options) {
    const ref = useRef<HTMLDivElement>(null);
    const type = typeof options.type === 'string' ? options.type : options.type()

    const [{isDragging}, drag] = useDrag(
        () => ({
            type,
            item,
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        []
    );

    const [{handlerId}, drop] = useDrop<CardProps,
        void,
        { handlerId: string | symbol | null }>(() => ({
        accept: options.dropAccept,
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover: (dragItem, monitor) => {
            if (!ref.current) {
                return;
            }

            const dragIndex = dragItem.index;
            const hoverIndex = item.index;

            // Don't replace items with themselves
            if (
                typeof dragIndex !== 'number' ||
                typeof hoverIndex !== 'number' ||
                dragIndex === hoverIndex ||
                !options.onMove
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
            options.onMove(dragIndex, hoverIndex);

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches
            dragItem.index = hoverIndex;
        },
    }));


    return {
        drag: {
            isDragging,
            drag
        },
        drop: {
            handlerId,
            drop
        },
        ref: drag(drop(ref)) as LegacyRef<HTMLDivElement>
    }
}
