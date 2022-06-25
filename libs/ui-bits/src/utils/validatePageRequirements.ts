import {PageOption} from "../types";
import {validateField} from "./validateField";
import {FormValues, getInputFormKey} from "@evento/calculations";

export function validatePageRequirements(
    page: PageOption<'CustomContent'>,
    pageNumber: number,
    formValues: FormValues
): boolean {
    const inputs: any[] = [];
    page.options.content.forEach((content) => {
        let key: string | undefined = undefined;
        switch (content.type) {
            case 'ContentCheckboxGroup':
            case 'ContentPollGroup':
            case 'ContentInput':
                key = getInputFormKey(content.options.fieldKey, pageNumber);
                inputs.push(
                    validateField(
                        key,
                        content.type,
                        formValues,
                        !!content.options.options?.isRequired
                    )
                );
                break;
            case 'ContentPayment':
                key = getInputFormKey('payment', pageNumber) + '.input';
                inputs.push(validateField(key, content.type, formValues,
                    !!content.options.options?.isRequired))
        }
    });

    return inputs.every((v) => v);
}
