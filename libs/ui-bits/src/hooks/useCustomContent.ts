import { useFormikContext } from 'formik';
import { useEffect, useMemo } from 'react';
import { usePages } from '../hooks';
import { validatePageRequirements } from '../utils';

export const useCustomContent = (onCanGoNext: (val?: boolean) => void) => {
    const form = useFormikContext<any>();
    const { pages, pageState, submitFn } = usePages();
    const { state, currentPage } = pageState ?? {};

    const inputsAreValid = useMemo(() => {
        if (typeof state?.currentIndex === 'number') {
            const currentPage = pages[state?.currentIndex];
            if (currentPage.type === 'CustomContent') {
                return validatePageRequirements(
                    currentPage,
                    state.currentIndex,
                    form.values
                );
            }
            return true;
        }
        return false;
    }, [state, pages, form]);

    useEffect(() => {
        if (
            inputsAreValid &&
            currentPage &&
            (currentPage as any).options?.submitOnLoad
        ) {
            submitFn()
                .then((data) => {
                    console.log(data);
                })
                .catch(console.warn);
        }
    }, [inputsAreValid, currentPage, submitFn]);

    useEffect(() => {
        onCanGoNext(inputsAreValid);
    }, [inputsAreValid, onCanGoNext, form, form.values, pages]);
};
