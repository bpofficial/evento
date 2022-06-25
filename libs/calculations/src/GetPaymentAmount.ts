import {FormValues, replaceTextWithInputValue} from "./FormUtils";

export function getPaymentAmount(key: unknown, inputs: Map<string, any>, calculations: Record<string, any>, form: FormValues): number | null {
    let amt: number | null = null;
    if (typeof key === 'string') {
        amt = Number(
            replaceTextWithInputValue(key, inputs, calculations, form)
        );
        if (Number.isNaN(amt)) {
            return null;
        }
    } else if (typeof key === 'number') {
        amt = key;
    }
    return amt;
}
