import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { getInputValue } from '../../page-config';
import { ContentProps } from '../../types';

interface ContentInputProps extends ContentProps {
    label: string;
    options?: {
        placeholder?: string;
        isRequired?: boolean;
        type?: React.HTMLInputTypeAttribute;
        autoFocus?: boolean;
    };
}

export const ContentInput = ({
    label,
    options,
    page,
    form,
    fieldKey,
    onCanGoNext,
}: ContentInputProps) => {
    const key = `${page.formikKey}.${fieldKey}`;

    const onChange = (value: string) => {
        form.setFieldValue(key, value);
        onCanGoNext();
    };

    const value = getInputValue(key, form);

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
        </FormControl>
    );
};
