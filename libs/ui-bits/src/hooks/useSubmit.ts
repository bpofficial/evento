import { useFormikContext } from 'formik';
import axios from 'axios';
import { useEnvironment } from './useEnvironment';

export const useSubmit = (formId?: string) => {
    const environment = useEnvironment();
    const form = useFormikContext<any>();
    return async () => {
        return axios.post(
            `${environment.api.baseUrl}/${formId}/submission`,
            form.values
        );
    };
};
