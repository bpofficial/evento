import { useCallback } from 'react';
import { useEnvironment } from './useEnvironment';
import { EventoApi } from '@evento/api-client';
import { isLeft } from 'fp-ts/lib/Either';
import { usePages } from '.';

export const usePaymentIntent = () => {
    const environment = useEnvironment();
    const { formId, version } = usePages();

    return useCallback(
        async (values: any, metadata?: Record<string, string>) => {
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
        [environment.api.baseUrl, formId, version]
    );
};
