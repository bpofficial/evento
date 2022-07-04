import axios from 'axios';
import { usePages } from '.';
import { useEnvironment } from './useEnvironment';
import { sanitize } from 'string-sanitizer';
import { HookEventTypes } from '@evento/models';

export function useWebhook() {
    const { formId } = usePages();
    const { api } = useEnvironment();

    /**
     * { 0_CustomContent: { value: { name: { value: 'some name' } } } }
     */
    const convertFormValuesToFields = (data: any) => {
        const fields: Record<string, string | number | boolean> = {};
        Object.entries(data).forEach(([_, value]) => {
            if (typeof value === 'object' && value) {
                Object.entries(value as any).forEach(([key, val]) => {
                    fields[key] = (val as any)?.value || val;
                });
            }
        });
        return fields;
    };

    const emitHook = async (
        event: HookEventTypes,
        data: Record<string, string | number | boolean>
    ) => {
        const fields = convertFormValuesToFields(data);
        const url = new URL(`${api.baseUrl}/api/v1/forms/${formId}/trigger`);
        return axios.post(url.toString(), { event, fields });
    };

    return (event: HookEventTypes, data: Record<string, any>) => {
        try {
            emitHook(event, data).then().catch();
        } catch (error: any) {
            console.warn('%s', sanitize(error.message));
            console.debug(error);
        }
    };
}
