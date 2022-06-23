import {useFormikContext} from 'formik';
import {useEffect, useMemo} from 'react';
import {usePages} from '../hooks';
import {validatePageRequirements} from '../utils';

export const useCustomContent = (
    onCanGoNext: (val?: boolean) => void,
) => {
    const form = useFormikContext()
    const {
        pages,
        pageState: {state},
    } = usePages();

    const inputsAreValid = useMemo(() => {
        const currentPage = pages[state.currentIndex];
        if (currentPage.type === 'CustomContent') {
            return validatePageRequirements(
                currentPage,
                state.currentIndex,
                form
            );
        }
        return true;
    }, [state.currentIndex, pages, form]);

    useEffect(() => {
        onCanGoNext(inputsAreValid);
    }, [inputsAreValid, onCanGoNext, form, form.values, pages]);
};
