import { useBoolean } from '@chakra-ui/react';
import { useSkip } from './useSkip';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useButtonHandlers } from './useButtonHandlers';
import { useWebhook } from './useWebhook';
import { useFormikContext } from 'formik';
import { FormModel } from '@evento/models';

interface UsePageTraversalProps {
    model: FormModel;
    inputs: Map<string, string>;
    state?: any;
    currentIndex: number;
    setCurrentIndex: Dispatch<SetStateAction<number>>;
    buttonHandlers: ReturnType<typeof useButtonHandlers>;
    loading: ReturnType<typeof useBoolean>[1];
    transition: ReturnType<typeof useBoolean>[1];
    preview?: boolean
}

export const usePageTraversal = (props: UsePageTraversalProps) => {
    const {
        model,
        buttonHandlers,
        loading,
        currentIndex,
        setCurrentIndex,
        inputs,
        transition,
        preview = false
    } = props;

    const form = useFormikContext<any>();
    const emit = useWebhook(preview);
    const [canGoNext, setCanGoNext] = useBoolean();
    const { clearButtonHandlers, handlePress } = buttonHandlers;

    const { next, previous } = useSkip({ model, inputs });

    const nextPage = useCallback(() => {
        handlePress('next', () => {
            setCanGoNext.off();
            loading.off();
            if (currentIndex >= (model.pages?.length ?? 0) - 1) return;
            transition.on();
            // clear the handler on success
            clearButtonHandlers();
            emit('form.next', form.values);
            setCurrentIndex(next);
        });
    }, [
        handlePress,
        setCanGoNext,
        loading,
        currentIndex,
        model.pages?.length,
        transition,
        clearButtonHandlers,
        emit,
        form.values,
        setCurrentIndex,
        next,
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
