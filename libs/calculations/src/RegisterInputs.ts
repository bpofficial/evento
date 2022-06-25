import {getInputFormKey} from "./FormUtils";
import {Page} from "../../models/src";

export function registerInputs(
    pages: Page[],
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
                    inputs.set(key, getInputFormKey(key, i));
                }
            }
        }
    }
    for (const key in calculations) {
        if (inputs.has(key)) {
            // console.error(
            //     `Registered inputs already contain '${key}' from calculations.`
            // );
            continue;
        }
        inputs.set(key, '$calculation');
    }
    return inputs;
}
