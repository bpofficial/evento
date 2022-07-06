import { useFormikContext } from 'formik';
import { useWebhook } from '.';

export const useSubmit = (preview = false) => {
    const emit = useWebhook(preview);
    const form = useFormikContext<any>();

    return () => {
        emit('form.submit', form.values);
    };
};
