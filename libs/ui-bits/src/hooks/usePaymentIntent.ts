import { useCallback } from 'react';
import { useEnvironment } from './useEnvironment';
import { EventoApi } from '@evento/api-client';
import { isLeft } from 'fp-ts/lib/Either';
import { useModel } from './modelContext';

export const usePaymentIntent = () => {
    const environment = useEnvironment();
    const { formId, version } = useModel();

    return useCallback(
        async (values: any, metadata?: Record<string, string>) => {
            if (!environment?.api?.baseUrl) return null;
            const api = new EventoApi({
                gatewayUrl: environment.api.baseUrl,
            });
            if (!formId) return;
            const result = await api.billing.createPaymentIntent(
                formId,
                values,
                metadata,
                version
            );
            if (isLeft(result)) {
                console.error(result.left);
                return null;
            }
            return result.right;
        },
        [environment, formId, version]
    );
};
