import {
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { getFormValue } from '../../utils';
import { ContentFieldProps } from '../../types';

interface ContentInputProps extends ContentFieldProps {
    label: string;
    options?: {
        placeholder?: string;
        isRequired?: boolean;
        type?: React.HTMLInputTypeAttribute;
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
        form.setFieldValue(key, value);
    };

    const value = getFormValue(key, form);

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
            <FormHelperText>{options?.helperText}</FormHelperText>
        </FormControl>
    );
};
