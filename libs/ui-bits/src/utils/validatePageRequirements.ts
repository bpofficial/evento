import { PageOption } from '../types';
import { validateField } from './validateField';
import { FormValues, getInputFormKey } from '@evento/calculations';
import { FormModel } from '@evento/models';

export function validatePageRequirements(
    page: PageOption<'CustomContent'>,
    pageNumber: number,
    formValues: FormValues,
    validations?: FormModel['validations']
): Map<string, string[] | true> {
    const inputs: Map<string, string[] | true> = new Map();
    page.options.content.forEach((content) => {
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

    return inputs;
}
