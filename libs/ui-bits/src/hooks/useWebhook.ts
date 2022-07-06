import { useModel } from './modelContext';
import { useEnvironment } from './useEnvironment';
import { sanitize } from 'string-sanitizer';
import { HookEventTypes } from '@evento/models';
import { EventoApi } from '@evento/api-client';

export function useWebhook(preview = false) {
    const model = useModel();
    const environment = useEnvironment();

    /**
     * { 0_CustomContent: { name: { value: 'some name' } } }
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
        if (!model.formId || preview || !environment?.api?.baseUrl) return;

        const api = new EventoApi({
            gatewayUrl: environment.api.baseUrl,
        });

        return api.hooks.trigger(model.formId, event, fields);
    };

    return (event: HookEventTypes, data: Record<string, any>) => {
        if (event !== 'form.submit' && !model.hooksEnabled) return;
        try {
            emitHook(event, data).then().catch(console.warn);
        } catch (error: any) {
            console.warn('%s', sanitize(error.message));
            console.debug(error);
        }
    };
}
