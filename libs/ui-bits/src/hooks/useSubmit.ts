import { useFormikContext } from 'formik';
import { useWebhook } from '.';

export const useSubmit = () => {
    const emit = useWebhook();
    const form = useFormikContext<any>();

    return () => {
        emit('form.submit', form.values);
    };
};
