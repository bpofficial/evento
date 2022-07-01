import { getInputFormKey } from '@evento/calculations';
import { useFormikContext } from 'formik';
import { useEffect, useMemo } from 'react';
import { usePages } from '../hooks';
import { validatePageRequirements } from '../utils';

export const useCustomContent = (onCanGoNext: (val?: boolean) => void) => {
    const form = useFormikContext<any>();
    const { pages, pageState, submitFn, validations } = usePages();
    const { state, currentPage } = pageState ?? {};

    const inputsAreValid = useMemo(() => {
        if (typeof state?.currentIndex === 'number') {
            const currentPage = pages[state?.currentIndex];
            if (currentPage.type === 'CustomContent') {
                const validationResult = validatePageRequirements(
                    currentPage,
                    state.currentIndex,
                    form.values,
                    validations
                );
                let success = true;
                for (const [fieldKey, result] of validationResult) {
                    if (result !== true && result.length !== 0) {
                        const inputKey = getInputFormKey(
                            fieldKey,
                            state.currentIndex
                        );
                        if (inputKey) {
                            success = false;
                            form.setFieldError(inputKey, result.join('<br/>'));
                        }
                    }
                }
                return success;
            }
            return true;
        }
        return false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, pages, form.values, validations]);

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
