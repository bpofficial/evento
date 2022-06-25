import {VStack} from '@chakra-ui/react';
import {useCallback} from 'react';
import {CheckboxOption, ContentFieldProps} from '../../../types';
import {getFormValue} from '@evento/calculations';
import {ContentCheckbox, ContentCheckboxProps} from '../Checkbox';

interface CheckboxGroupProps extends ContentFieldProps {
    items: Omit<ContentCheckboxProps, keyof ContentFieldProps>[];
    options?: {
        isRequired?: boolean;
        multiSelect?: boolean;
    };
}

export const ContentCheckboxGroup = ({
                                         fieldKey,
                                         items,
                                         page,
                                         form,
                                         options,
                                     }: CheckboxGroupProps) => {
    const key = `${page.formikKey}.${fieldKey}`;

    const onChange = (item: CheckboxOption) => (val: boolean) => {
        if (options?.multiSelect) {
            let currentValue = getFormValue(key, form.values) ?? [];
            if (!(currentValue instanceof Array)) {
                currentValue = [currentValue];
            }
            const idx = currentValue.findIndex(
                (v: CheckboxOption) => v.id === item.id
            );
            if (idx !== -1) {
                if (val) return;
                currentValue.splice(idx, 1);
                form.setFieldValue(key, currentValue);
            } else {
                form.setFieldValue(key, currentValue.concat([item]));
            }
        } else {
            form.setFieldValue(key, item);
        }
    };

    const getIsSelected = useCallback(
        (item: CheckboxOption) => {
            let currentValue = getFormValue(key, form.values);
            if (options?.multiSelect) {
                if (!(currentValue instanceof Array)) {
                    currentValue = [];
                }
                const exists = (currentValue as CheckboxOption[]).findIndex(
                    (v) => v.id === item.id
                );
                return exists !== -1;
            } else {
                if (!(currentValue instanceof Array)) {
                    return (currentValue && currentValue['id'] === item.id);
                }
                return (currentValue[0] && currentValue[0]['id'] === item.id);
            }
        },
        [form, key, options?.multiSelect]
    );

    return (
        <VStack alignItems="flex-start" spacing={4}>
            {items.map((props, key) => (
                <ContentCheckbox
                    {...{key, ...props, page, form, fieldKey}}
                    isSelected={getIsSelected(props)}
                    onChange={onChange(props)}
                />
            ))}
        </VStack>
    );
};
