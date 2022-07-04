import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import {
    getFormError,
    getFormTouched,
    getInputFormKey,
    getSingleFormValue,
} from '@evento/calculations';
import { ContentFieldProps } from '../../types';
import { HTMLInputTypeAttribute, useMemo } from 'react';
import { useFormikContext } from 'formik';

interface ContentInputProps extends ContentFieldProps {
    label: string;
    options?: {
        placeholder?: string;
        isRequired?: boolean;
        type?: HTMLInputTypeAttribute;
        autoFocus?: boolean;
        autoComplete?: string;
        helperText?: string;
    };
}

export const ContentInput = ({
    label,
    options,
    page,
    fieldKey,
}: ContentInputProps) => {
    const form = useFormikContext<any>();
    const key = `${page.formikKey}.${fieldKey}`;
    const value = getSingleFormValue(key, form.values)?.value;
    const { helperText, ...props } = options ?? {};

    const onChange = (value: string) => {
        form.setFieldValue(key, { value }, false);
    };

    const touched = useMemo(
        () => getFormTouched(key, form.touched),
        [form.touched, key]
    );

    const error = useMemo(
        () => getFormError(key, form.errors),
        [form.errors, key]
    );

    return (
        <FormControl
            isRequired={!!options?.isRequired}
            isInvalid={!!(touched && error)}
        >
            <FormLabel>{label}</FormLabel>
            <Input
                {...props}
                size="lg"
                w="100%"
                value={value ?? ''}
                onChange={(evt) => onChange(evt.target.value)}
                onBlur={() => form.setFieldTouched(key, true, false)}
            />
            {touched && error ? (
                <FormErrorMessage>
                    <div
                        dangerouslySetInnerHTML={{ __html: error ?? '' }}
                    ></div>
                </FormErrorMessage>
            ) : (
                <FormHelperText>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
};
