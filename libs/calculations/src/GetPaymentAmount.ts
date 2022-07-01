import { FormValues, replaceTextWithInputValue } from './FormUtils';

export function getPaymentAmount(
    key: string | number,
    inputs: Map<string, any>,
    calculations: Record<string, any>,
    form: FormValues
): number | null {
    let amt: number | null = null;
    if (typeof key === 'string') {
        if (key.includes('{{') && key.includes('}}')) {
            amt = Number(
                replaceTextWithInputValue(key, inputs, calculations, form)
            );
            if (Number.isNaN(amt)) {
                return null;
            }
        } else {
            throw new Error(
                `Unable to parse payment amount key from '${key}'.`
            );
        }
    } else if (typeof key === 'number') {
        amt = key;
    }
    return amt;
}
