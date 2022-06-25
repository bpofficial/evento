import {useFormikContext} from 'formik';
import {useEffect, useMemo} from 'react';
import {usePages} from '../hooks';
import {validatePageRequirements} from '../utils';

export const useCustomContent = (
    onCanGoNext: (val?: boolean) => void,
) => {
    const form = useFormikContext<any>()
    const {
        pages,
        pageState: {state, currentPage},
        submitFn
    } = usePages();

    const inputsAreValid = useMemo(() => {
        const currentPage = pages[state.currentIndex];
        if (currentPage.type === 'CustomContent') {
            return validatePageRequirements(
                currentPage,
                state.currentIndex,
                form.values
            );
        }
        return true;
    }, [state.currentIndex, pages, form]);

    useEffect(() => {
        if (inputsAreValid && currentPage.options.submitOnLoad) {
            submitFn().then(data => {
                console.log(data)
            }).catch(console.warn)
        }
    }, [inputsAreValid, currentPage, submitFn])

    useEffect(() => {
        onCanGoNext(inputsAreValid);
    }, [inputsAreValid, onCanGoNext, form, form.values, pages]);
};
