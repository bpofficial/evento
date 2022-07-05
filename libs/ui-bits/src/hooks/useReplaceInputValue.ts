import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { usePages } from './pageContext';
import { useModel } from './modelContext';
import { replaceTextWithInputValue } from '@evento/calculations';

export function useReplaceInputValue(str: string) {
    const form = useFormikContext<any>();
    const { inputs } = usePages();
    const model = useModel();
    const [value, setValue] = useState('');

    useEffect(() => {
        const res = replaceTextWithInputValue(
            str,
            inputs,
            model.calculations ?? {},
            form.values
        );
        setValue(res);
    }, [str, inputs, form, model]);

    return value;
}
