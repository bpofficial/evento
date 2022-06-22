import { FormikContextType } from 'formik';
import { calculateField } from '../utils/calculate-field';
import { usePages } from './pageContext';

export function evaluate(
    cond: any,
    inputs: Map<string, string>,
    calculations: Record<string, string>,
    form: FormikContextType<any>
) {
    return calculateField(cond, inputs, calculations, form);
}

export function useEvaluation(cond: any, form: FormikContextType<any>) {
    const { inputs, calculations } = usePages();
    return calculateField(cond, inputs, calculations, form);
}

export function useEvaluater(form: FormikContextType<any>) {
    const { inputs, calculations } = usePages();
    return (cond: any) => evaluate(cond, inputs, calculations, form);
}
