import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { usePages } from '../hooks';
import { CanGoNext } from '../types';
import { useContentValidation } from './useContentValidation';

export const useCustomContent = (onCanGoNext: CanGoNext['onCanGoNext']) => {
    const form = useFormikContext<any>();
    const { pages, pageState, submitFn } = usePages();
    const { currentPage } = pageState ?? {};
    const [inputsAreValid, _, inputs] = useContentValidation();

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
        if (inputs.length) {
            onCanGoNext(
                inputsAreValid,
                'validation, ' + JSON.stringify(form.errors)
            );
        }
    }, [inputsAreValid, onCanGoNext, form, form.values, pages, inputs]);
};
