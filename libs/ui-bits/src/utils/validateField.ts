import {ContentType} from "../types";
import {getSingleFormValue} from "@evento/calculations";

export function validateField(
    fieldKey: string,
    type: ContentType,
    formValues: Record<string, any>,
    isRequired = false
) {
    if (!isRequired) return true;

    // Each field will be an object and the value will be represented by the value property on that object.
    const value = getSingleFormValue(fieldKey, formValues)?.value;

    let isValid;
    switch (type) {
        case 'ContentPollGroup':
        case 'ContentCheckboxGroup':
        case 'ContentPayment':
            isValid = value;
            break;
        case 'ContentInput':
            isValid = (value && typeof value === 'string' && value !== '');
            break;
    }

    return !!isValid;
}
