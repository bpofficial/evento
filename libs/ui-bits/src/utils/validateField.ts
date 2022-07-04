import {
    getInputFormKey,
    getSingleFormValue,
    MapAndValidate,
} from '@evento/calculations';
import { FormModel } from '@evento/models';
import isEmpty from 'is-empty';
import { isLeft } from 'fp-ts/lib/Either';

export async function validateField(
    fieldKey: string,
    pageNumber: number,
    formValues: Record<string, any>,
    validations?: FormModel['validations']
) {
    const validators = new Map(Object.entries(validations ?? {}));
    const validator = validators.get(fieldKey) ?? null;

    const fullKey = getInputFormKey(fieldKey, pageNumber) ?? '';
    // Each field will be an object and the value will be represented by the value property on that object.
    const value = getSingleFormValue(fullKey, formValues)?.value;

    if (!validator && isEmpty(value)) return true;
    const validate = new MapAndValidate();
    const result = await validate.interpret(value, validator, {
        fieldKey,
        pageNumber,
        url: '',
    });
    if (isLeft(result)) return result.left;
    return result.right;
}
