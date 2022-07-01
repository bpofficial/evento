import { calculateField } from './CalculateField';

export type FormValues = Record<string, any>;
export type FieldValue = { value?: any } & Record<string, any>;

export function getSingleFormValue(
    formKey: string,
    formValues: FormValues
): FieldValue {
    let value = getFormValue(formKey, formValues);
    if (value instanceof Array) {
        value = value[0];
    }
    return value;
}

export function getFormValue(
    formKey: string,
    formValues: FormValues
): FieldValue | FieldValue[] {
    const parts = formKey?.split?.('.');
    let value = formValues;
    for (const part of parts) {
        value = value?.[part];
    }
    return value;
}

export function getFormTouched(
    formKey: string,
    formTouched: FormValues
): boolean {
    const parts = formKey?.split?.('.');
    let value = formTouched;
    for (const part of parts) {
        value = value?.[part];
    }
    return value as unknown as boolean;
}

export function getFormError(formKey: string, formErrors: FormValues): string {
    const parts = formKey?.split?.('.');
    let value = formErrors;
    for (const part of parts) {
        value = value?.[part];
    }
    return value as unknown as string;
}

export function getInputFormKey(key: string, sourcePage?: number) {
    if (!(typeof sourcePage === 'number')) return null;
    return `${sourcePage}_CustomContent.${key}`;
}

export function replaceTextWithInputValue(
    str: string,
    inputs: Map<string, string>,
    calculations: Record<string, any>,
    formValues: FormValues
) {
    for (const [key, field] of inputs) {
        let value;
        if (calculations[key]) {
            value = calculateField(
                calculations[key],
                inputs,
                calculations,
                formValues
            );
        } else {
            value = getSingleFormValue(field, formValues)?.value;
        }
        str = str.replaceAll(`{{${key}}}`, value);
    }
    return str;
}
