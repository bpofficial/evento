import { PageOption } from '../types';
import { validateField } from './validateField';
import { FormValues, getInputFormKey } from '@evento/calculations';
import { FormModel } from '@evento/models';

type Result = [string, true | string[]];

export async function validatePageRequirements(
    page: PageOption<'CustomContent'>,
    pageNumber: number,
    formValues: FormValues,
    validations?: FormModel['validations']
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
                        validateField(key, pageNumber, formValues, validations)
                    );
                }
                break;
            case 'ContentPayment':
                key = getInputFormKey('payment', pageNumber);
                if (key) {
                    inputs.set(
                        key,
                        validateField(
                            key + '.input',
                            pageNumber,
                            formValues,
                            validations
                        )
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
