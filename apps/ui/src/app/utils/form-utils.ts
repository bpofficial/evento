import {FormikContextType} from 'formik';
import {ContentType, PageOption, PageOptions} from '../types';
import {calculateField} from './calculate-field';

type FieldValue = { value?: any } & Record<string, any>;

export function getSingleFormValue(
    formikKey: string,
    formik: FormikContextType<any>
): FieldValue {
    let value = getFormValue(formikKey, formik);
    if (value instanceof Array) {
        value = value[0];
    }
    return value;
}

export function getFormValue(
    formikKey: string,
    formik: FormikContextType<any>
): FieldValue | FieldValue[] {
    const parts = formikKey.split('.');
    let value = formik.values;
    for (const part of parts) {
        value = value?.[part];
    }
    return value;
}

export const getFieldValue = getFormValue;

export function getInputFormikKey(key: string, sourcePage: number) {
    return `${sourcePage}_CustomContent.${key}`;
}

export function registerInputs(
    pages: PageOptions[],
    calculations: Record<string, any>
) {
    const inputs = new Map<string, string>();
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        if (page.type === 'CustomContent') {
            for (let j = 0; j < page.options.content.length; j++) {
                const content = page.options.content[j];
                if (
                    [
                        'ContentInput',
                        'ContentCheckboxGroup',
                        'ContentPollGroup',
                    ].includes(content.type)
                ) {
                    const key = (content.options as any).fieldKey
                    inputs.set(key, getInputFormikKey(key, i));
                }
            }
        }
    }
    for (const key in calculations) {
        if (inputs.has(key)) {
            console.error(
                `Registered inputs already contain '${key}' from calculations.`
            );
            continue;
        }
        inputs.set(key, '$calculation');
    }
    return inputs;
}

export function replaceTextWithInputValue(
    str: string,
    inputs: Map<string, string>,
    calculations: Record<string, any>,
    form: FormikContextType<any>
) {
    for (const [key, field] of inputs) {
        let value;
        if (calculations[key]) {
            value = calculateField(
                calculations[key],
                inputs,
                calculations,
                form
            );
        } else {
            value = getSingleFormValue(field, form)?.value;
        }
        str = str.replaceAll(`{{${key}}}`, value);
    }
    return str;
}

export function validateField(
    fieldKey: string,
    type: ContentType,
    form: FormikContextType<any>,
    isRequired = false
) {
    if (!isRequired) return true;

    // Each field will be an object and the value will be represented by the value property on that object.
    const value = getSingleFormValue(fieldKey, form)?.value;

    let isValid;
    switch (type) {
        case 'ContentPollGroup':
        case 'ContentCheckboxGroup':
            isValid = value;
            break;
        case 'ContentPayment':
            isValid = value?.input;
            break;
        case 'ContentInput':
            isValid = (value && typeof value === 'string' && value !== '');
            break;
    }

    return !!isValid;
}

export function validatePageRequirements(
    page: PageOption<'CustomContent'>,
    pageNumber: number,
    form: FormikContextType<any>
): boolean {
    const inputs: any[] = [];
    page.options.content.forEach((content) => {
        let key: string | undefined = undefined;
        switch (content.type) {
            case 'ContentCheckboxGroup':
            case 'ContentPollGroup':
            case 'ContentInput':
                key = getInputFormikKey(content.options.fieldKey, pageNumber);
                inputs.push(
                    validateField(
                        key,
                        content.type,
                        form,
                        !!content.options.options?.isRequired
                    )
                );
                break;
            case 'ContentPayment':
                key = getInputFormikKey('payment', pageNumber) + '.input';
                inputs.push(validateField(key, content.type, form,
                    !!content.options.options?.isRequired))
        }
    });

    return inputs.every((v) => v);
}
