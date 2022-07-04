import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { usePages } from '../hooks';
import { useContentValidation } from './useContentValidation';

export const useCustomContent = (onCanGoNext: (val?: boolean) => void) => {
    const form = useFormikContext<any>();
    const { pages, pageState, submitFn } = usePages();
    const { currentPage } = pageState ?? {};
    const [inputsAreValid] = useContentValidation();

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
