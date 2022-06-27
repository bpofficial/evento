import {
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { getSingleFormValue } from '@evento/calculations';
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

    return (
        <FormControl isRequired={!!options?.isRequired}>
            <FormLabel>{label}</FormLabel>
            <Input
                {...props}
                size="lg"
                w="100%"
                value={value ?? ''}
                onChange={(evt) => onChange(evt.target.value)}
            />
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};
