import {Box, Checkbox, HStack, TextDecorationProps} from '@chakra-ui/react';
import {CheckboxOption, ContentFieldProps} from '../../types';
import {getFormValue} from "@evento/calculations";

export interface ContentCheckboxProps
    extends ContentFieldProps,
        CheckboxOption {
    value: string | number | boolean;
    isSelected?: boolean;
    options?: {
        isRequired?: boolean;
        text?: {
            textDecoration?: TextDecorationProps['textDecoration'];
        };
        container?: {
            opacity?: number;
        };
        checkbox?: {
            disabled?: boolean;
        };
    };
    postRenderItem?: JSX.Element;
    onChange?: (val: boolean) => void;
}

export const ContentCheckbox = ({
                                    id,
                                    fieldKey,
                                    label,
                                    isSelected,
                                    postRenderItem,
                                    options,
                                    page,
                                    form,
                                    onChange: onChangeProp,
                                }: ContentCheckboxProps) => {
    const key = `${page.formikKey}.${fieldKey}`;

    const onChange = (value: boolean) => {
        if (onChangeProp) {
            return onChangeProp(value);
        }
        form.setFieldValue(key, value);
    };

    const getIsSelected = () => {
        if (typeof isSelected === 'boolean') return isSelected;
        const field = getFormValue(key, form.values);
        return !!field;
    };

    return (
        <Box opacity={options?.container?.opacity}>
            <HStack>
                <Checkbox
                    disabled={!!options?.checkbox?.disabled}
                    isChecked={getIsSelected()}
                    onChange={(e) => onChange(e.currentTarget.checked)}
                />
                <Box {...(options?.text ?? {})}>{label}</Box>
                {postRenderItem ?? null}
            </HStack>
        </Box>
    );
};
