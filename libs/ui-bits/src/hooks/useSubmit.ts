import {useFormikContext} from 'formik';
import {useEnvironment} from './useEnvironment';
import {EventoApi} from '@evento/api-client';

export const useSubmit = (formId?: string) => {
    const environment = useEnvironment();
    const form = useFormikContext<any>();
    return async () => {
        const api = new EventoApi({
            gatewayUrl: environment.api.baseUrl,
        })
        console.log({ form: form.values })
    };
};
