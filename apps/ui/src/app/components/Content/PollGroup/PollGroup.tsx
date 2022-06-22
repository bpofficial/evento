import { ContentFieldProps, PollOption } from '../../../types';
import { VStack } from '@chakra-ui/react';
import { PollItem } from './PollItem';
import { getSingleFormValue } from '../../../utils';

interface PollGroupProps extends ContentFieldProps {
    fieldKey: string;
    totalPolls: number;
    items: PollOption[];
    options?: {
        isRequired?: boolean;
    };
}

export const ContentPollGroup = ({
    fieldKey,
    totalPolls,
    items,
    options,
    page,
    form,
}: PollGroupProps) => {
    const key = `${page.formikKey}.${fieldKey}`;

    const onChange = (item: PollOption) => () => {
        form.setFieldValue(key, item);
    };

    const getIsSelected = (item: PollOption) => {
        const field = getSingleFormValue(key, form)?.value;
        return !!(field && field.id === item.id);
    };

    return (
        <VStack alignItems="flex-start" spacing={4} w="100%">
            {items.map((props, key) => (
                <PollItem
                    {...{ key, ...props, totalPolls }}
                    onChange={onChange(props)}
                    isSelected={getIsSelected(props)}
                />
            ))}
        </VStack>
    );
};
