import {FormValues, getSingleFormValue} from "./FormUtils";
import {MapAndCalculate} from "./MapAndCalculate";

export function calculateField(
    logic: any,
    inputs: Map<string, string>,
    calculations: Record<string, any>,
    form: FormValues
) {
    const values = new Map();
    for (const [key, field] of inputs) {
        let value;
        if (field === '$calculation') {
            value = new MapAndCalculate(values).interpret({
                ...calculations[key],
            });
        } else {
            value = getSingleFormValue(field, form)?.value;
        }
        values.set(key, value);
    }
    return new MapAndCalculate(values).interpret({...logic});
}
