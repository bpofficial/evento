import {FormikContextType, useFormikContext} from 'formik';
import {calculateField} from '../utils/calculate-field';
import {usePages} from './pageContext';
import {useCallback} from "react";

export function evaluate(
    cond: any,
    inputs: Map<string, string>,
    calculations: Record<string, string>,
    form: FormikContextType<any>
) {
    return calculateField(cond, inputs, calculations, form);
}

export function useEvaluation(cond: any) {
    const form = useFormikContext();
    const {inputs, calculations} = usePages();
    return calculateField(cond, inputs, calculations, form);
}

export function useEvaluater() {
    const form = useFormikContext();
    const {inputs, calculations} = usePages();

    return useCallback((cond: any) => {
        evaluate(cond, inputs, calculations, form)
    }, [calculations, form, inputs]);
}
