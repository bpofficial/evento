import {
    getInputFormKey,
    getSingleFormValue,
    MapAndValidate,
} from '@evento/calculations';
import { FormModel } from '@evento/models';
import isEmpty from 'is-empty';
import { isLeft } from 'fp-ts/lib/Either';

export function validateField(
    fieldKey: string,
    pageNumber: number,
    formValues: Record<string, any>,
    validations?: FormModel['validations']
) {
    const validators = new Map(Object.entries(validations ?? {}));
    const validator = validators.get(fieldKey) ?? {};

    const fullKey = getInputFormKey(fieldKey, pageNumber) ?? '';
    // Each field will be an object and the value will be represented by the value property on that object.
    const value = getSingleFormValue(fullKey, formValues)?.value;

    if (!validator.$required && isEmpty(value)) return true;
    const validate = new MapAndValidate();
    const result = validate.interpret(value, validator);
    if (isLeft(result)) return result.left;
    return result.right;
}
