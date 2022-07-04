import { useBoolean } from '@chakra-ui/react';
import { CalcInfo, useSkip } from './useSkip';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { PageOptions } from '../types';
import { useButtonHandlers } from './useButtonHandlers';
import { useWebhook } from './useWebhook';
import { useFormikContext } from 'formik';

interface UsePageTraversalProps {
    pages?: PageOptions[];
    state?: any;
    info?: CalcInfo;
    currentIndex: number;
    setCurrentIndex: Dispatch<SetStateAction<number>>;
    buttonHandlers: ReturnType<typeof useButtonHandlers>;
    loading: ReturnType<typeof useBoolean>[1];
    transition: ReturnType<typeof useBoolean>[1];
}

export const usePageTraversal = (props: UsePageTraversalProps) => {
    const {
        buttonHandlers,
        loading,
        currentIndex,
        setCurrentIndex,
        info,
        pages,
        transition,
    } = props;

    const form = useFormikContext<any>();
    const emit = useWebhook();
    const [canGoNext, setCanGoNext] = useBoolean();
    const { clearButtonHandlers, handlePress } = buttonHandlers;

    const { next, previous } = useSkip({ pages, info });

    const nextPage = useCallback(() => {
        handlePress('next', () => {
            setCanGoNext.off();
            loading.off();
            if (currentIndex >= (pages?.length ?? 0) - 1) return;
            transition.on();
            // clear the handler on success
            clearButtonHandlers();
            emit('form.next', form.values);
            setCurrentIndex(next);
        });
    }, [
        clearButtonHandlers,
        currentIndex,
        handlePress,
        loading,
        next,
        pages?.length,
        setCanGoNext,
        setCurrentIndex,
        transition,
        emit,
        form.values,
    ]);

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
    }, [
        clearButtonHandlers,
        currentIndex,
        handlePress,
        loading,
        previous,
        setCanGoNext,
        setCurrentIndex,
        transition,
    ]);

    return { canGoNext, setCanGoNext, nextPage, previousPage };
};
