import {useFormikContext} from 'formik';
import {useEnvironment} from './useEnvironment';
import {EventoApi} from '@evento/api-client';
import {useCallback} from "react";

export const usePaymentIntent = (formId?: string) => {
    const environment = useEnvironment();
    const form = useFormikContext<any>();

    return useCallback(async () => {
        const api = new EventoApi({
            gatewayUrl: environment.api.baseUrl,
        })
        if (!formId) return;
        return api.billing.createPaymentIntent(formId, form.values);
    }, [environment.api.baseUrl, form.values, formId]);
};
