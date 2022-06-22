import { useBoolean } from '@chakra-ui/react';
import { FormikContextType } from 'formik';
import { useEffect, useMemo } from 'react';
import { useEvaluater } from '../hooks';
import { usePages } from '../hooks/pageContext';
import { validatePageRequirements } from '../utils';

export const useCustomContent = (
    onCanGoNext: (val?: boolean) => void,
    form: FormikContextType<any>
) => {
    const [isLoading, loading] = useBoolean(true);
    const {
        pages,
        pageState: { state, actions },
    } = usePages();
    const evaluate = useEvaluater(form);

    // Handle skipping logic
    useEffect(() => {
        loading.on();
        const currentPage = pages[state.currentIndex];
        if (currentPage.skipPageCondition) {
            const shouldSkip = evaluate(currentPage.skipPageCondition);
            if (shouldSkip) {
                if (state.currentIndex > state.previousIndex) {
                    loading.off();
                    actions.nextPage();
                } else if (state.previousIndex > state.currentIndex) {
                    loading.off();
                    actions.previousPage();
                }
            }
        }
        loading.off();
    }, [
        actions,
        evaluate,
        loading,
        pages,
        state,
        state.currentIndex,
        state.previousIndex,
    ]);

    const inputsAreValid = useMemo(() => {
        const currentPage = pages[state.currentIndex];
        if (currentPage.type === 'CustomContent') {
            return (
                validatePageRequirements(
                    currentPage,
                    state.currentIndex,
                    form
                ) === true
            );
        }
        return true;
    }, [pages, state.currentIndex, form]);

    useEffect(() => {
        onCanGoNext(inputsAreValid);
    }, [inputsAreValid, onCanGoNext, form, form.values, pages]);

    return isLoading;
};
