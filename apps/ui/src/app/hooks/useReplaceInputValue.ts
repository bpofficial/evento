import { FormikContextType } from 'formik';
import { useEffect, useState } from 'react';
import { replaceTextWithInputValue } from '../utils';
import { usePages } from './pageContext';

export function useReplaceInputValue(
    str: string,
    form: FormikContextType<any>
) {
    const { inputs, calculations } = usePages();
    const [value, setValue] = useState(str);

    useEffect(() => {
        const res = replaceTextWithInputValue(str, inputs, calculations, form);
        setValue(res);
    }, [str, inputs, form, calculations]);

    return value;
}
