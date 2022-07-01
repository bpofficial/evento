import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { usePages } from './pageContext';
import { replaceTextWithInputValue } from '@evento/calculations';

export function useReplaceInputValue(str: string) {
    const form = useFormikContext<any>();
    const { inputs, calculations = {} } = usePages();
    const [value, setValue] = useState('');

    useEffect(() => {
        const res = replaceTextWithInputValue(
            str,
            inputs,
            calculations,
            form.values
        );
        setValue(res);
    }, [str, inputs, form, calculations]);

    return value;
}
