import { getInputFormKey } from '@evento/calculations';
import { useFormikContext } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import useSSR from 'use-ssr';
import { usePages } from '.';
import { validatePageRequirements } from '../utils';

export function useContentValidation(): [boolean, () => Promise<void>] {
    const form = useFormikContext<any>();
    const { pages, pageState, validations } = usePages();
    const { state, currentPage } = pageState ?? {};
    const { isBrowser } = useSSR();
    const [inputErrors, setInputErrors] = useState<boolean[]>([]);

    // If every input field has a falsy error than the inputs are valid.
    const inputsAreValid = useMemo(
        () => inputErrors.every((v) => !v),
        [inputErrors]
    );

    const validate = async () => {
        if (typeof state?.currentIndex === 'number') {
            const currentPage = pages[state?.currentIndex];
            if (currentPage.type === 'CustomContent') {
                const validationResult = await validatePageRequirements(
                    currentPage,
                    state.currentIndex,
                    form.values,
                    validations
                );
                const errs: boolean[] = [];
                for (const [fieldKey, result] of validationResult) {
                    const inputKey = getInputFormKey(
                        fieldKey,
                        state.currentIndex
                    );
                    if (!inputKey) continue;
                    if (result !== true && result.length !== 0 && isBrowser) {
                        form.setFieldError(
                            inputKey,
                            result
                                .map((r) => '&bull;&nbsp;' + r) // bull = bullet point, nbsp = whitespace
                                .join('<br/>')
                        );
                        errs.push(true);
                    } else {
                        errs.push(false);
                        form.setFieldError(inputKey, undefined);
                    }
                }
                setInputErrors(errs);
            }
        }
    };

    useEffect(() => {
        validate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, pages, form.values, validations]);

    return [inputsAreValid, validate];
}
