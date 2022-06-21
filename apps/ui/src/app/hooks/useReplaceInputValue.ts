import { FormikContextType } from 'formik';
import { useEffect, useState } from 'react';
import { replaceTextWithInputValue } from '../utils';
import { usePages } from './pageContext';

export function useReplaceInputValue(
    str: string,
    form: FormikContextType<any>
) {
    const { inputs } = usePages();
    const [value, setValue] = useState(str);

    useEffect(() => {
        const res = replaceTextWithInputValue(str, inputs, form);
        setValue(res);
    }, [str, inputs, form]);

    return value;
}
