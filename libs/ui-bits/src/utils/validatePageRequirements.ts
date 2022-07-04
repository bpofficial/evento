import { validateField } from './validateField';
import {
    FormValues,
    getInputFormKey,
    getSingleFormValue,
} from '@evento/calculations';
import { FormModel, Page } from '@evento/models';

type Result = [string, true | string[]];

export async function validatePageRequirements(
    page: Page,
    pageNumber: number,
    formValues: FormValues,
    validations?: FormModel['validations'],
    url?: string
): Promise<Map<string, true | string[]>> {
    const inputs: Map<string, Promise<true | string[]>> = new Map();
    page.options.content.map(async (content) => {
        let key: string | null = null;
        switch (content.type) {
            case 'ContentCheckboxGroup':
            case 'ContentPollGroup':
            case 'ContentInput':
                key = content.options.fieldKey;
                if (key) {
                    inputs.set(
                        key,
                        validateField(
                            key,
                            pageNumber,
                            formValues,
                            validations,
                            url
                        )
                    );
                }
                break;
            case 'ContentPayment':
                if (key) {
                    const value = !!getSingleFormValue(
                        getInputFormKey('payment', pageNumber) + '.input',
                        formValues
                    )?.value;
                    inputs.set(
                        key,
                        Promise.resolve(value || ['Payment required'])
                    );
                }
        }
    });

    const result: Result[] = await Promise.all(
        Array.from(inputs.entries()).map(async ([key, promise]) => {
            return promise
                .then((res) => [key, res] as Result)
                .catch((err) => [key, [err?.message]] as Result);
        })
    );

    return new Map<string, true | string[]>(result);
}
