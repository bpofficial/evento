import { FormikContextType } from 'formik';
import { PageOption, PageOptions } from '../types';

export function getFormValue(
    formikKey: string,
    formik: FormikContextType<any>
) {
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

export function registerInputs(pages: PageOptions[]) {
    const inputs = new Map<string, string>();
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        if (page.type === 'CustomContent') {
            for (let j = 0; j < page.options.content.length; j++) {
                const content = page.options.content[j];
                if (content.type === 'ContentInput') {
                    const key = content.options.fieldKey;
                    inputs.set(key, getInputFormikKey(key, i));
                }
            }
        }
    }
    return inputs;
}

export function validateField(
    fieldKey: string,
    type: 'ContentCheckboxGroup' | 'ContentPollGroup' | 'ContentInput',
    form: FormikContextType<any>,
    isRequired = false
) {
    if (!isRequired) return true;
    const value = getFieldValue(fieldKey, form);

    let isValid;
    switch (type) {
        case 'ContentPollGroup':
        case 'ContentCheckboxGroup':
            isValid = !!value;
            break;
        case 'ContentInput':
            isValid = !!(value && typeof value === 'string' && value !== '');
            break;
    }

    return isValid;
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
        }
    });

    return inputs.every((v) => v);
}
