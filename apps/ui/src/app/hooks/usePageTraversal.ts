import {useBoolean} from "@chakra-ui/react";
import {CalcInfo, useSkip} from "./useSkip";
import {Dispatch, SetStateAction, useCallback} from "react";
import {PageOptions} from "../types";
import {PagesState} from "./usePagesState";
import {useButtonHandlers} from "./useButtonHandlers";

interface UsePageTraversalProps {
    pages: PageOptions[];
    state: Omit<PagesState['state'], 'canGoNext'>;
    info: CalcInfo;
    currentIndex: number;
    setCurrentIndex: Dispatch<SetStateAction<number>>;
    buttonHandlers: ReturnType<typeof useButtonHandlers>;
    loading: ReturnType<typeof useBoolean>[1];
    transition: ReturnType<typeof useBoolean>[1];
}

export const usePageTraversal = (props: UsePageTraversalProps) => {
    const {buttonHandlers, loading, currentIndex, setCurrentIndex, info, state, pages, transition} = props;
    const [canGoNext, setCanGoNext] = useBoolean();
    const {clearButtonHandlers, handlePress} = buttonHandlers

    const {next, previous} = useSkip(pages, state, info);

    const nextPage = useCallback(() => {
        handlePress('next', () => {
            setCanGoNext.off();
            loading.off();
            if (currentIndex >= pages.length - 1) return;
            transition.on();
            // clear the handler on success
            clearButtonHandlers();
            setCurrentIndex(next);
        });
    }, [clearButtonHandlers, currentIndex, handlePress, loading, next, pages.length, setCanGoNext, setCurrentIndex, transition]);

    const previousPage = useCallback(() => {
        handlePress('prev', () => {
            setCanGoNext.off();
            loading.off();
            if (currentIndex === 0) return;
            transition.on();
            // clear the handler on success
            clearButtonHandlers();
            setCurrentIndex(previous);
        });
    }, [clearButtonHandlers, currentIndex, handlePress, loading, previous, setCanGoNext, setCurrentIndex, transition]);

    return {canGoNext, setCanGoNext, nextPage, previousPage};
}
