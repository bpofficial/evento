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
import { HTMLInputTypeAttribute, useEffect } from 'react';

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
    form,
    fieldKey,
}: ContentInputProps) => {
    const key = `${page.formikKey}.${fieldKey}`;
    const value = getSingleFormValue(key, form.values)?.value;
    const { helperText, ...props } = options ?? {};

    const onChange = (value: string) => {
        form.setFieldValue(key, { value });
    };

    const touched = getFormTouched(key, form.touched);
    const error = getFormError(key, form.errors);

    console.log({ error, touched });

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
                <FormErrorMessage>{error}</FormErrorMessage>
            ) : null}
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};
