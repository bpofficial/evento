import {
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { getSingleFormValue } from '../../utils';
import { ContentFieldProps } from '../../types';
import {HTMLInputTypeAttribute} from 'react';

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

    const onChange = (value: string) => {
        form.setFieldValue(key, { value });
    };

    const value = getSingleFormValue(key, form)?.value;

    const helperText = options?.helperText ?? '';
    delete options?.helperText;

    return (
        <FormControl isRequired={!!options?.isRequired}>
            <FormLabel>{label}</FormLabel>
            <Input
                {...options}
                size="lg"
                w="100%"
                value={value}
                onChange={(evt) => onChange(evt.target.value)}
            />
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    );
};
