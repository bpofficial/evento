import { VStack } from '@chakra-ui/react';
import { ContentHeading, PollItemList } from '../components';
import { useCallback, useEffect } from 'react';
import { CanGoNext, Poll } from '../types';

export interface SimpleVoteProps extends CanGoNext {
    poll: Poll;
    allowCustomOptions?: boolean;
    total: number;
}

export const SimplePoll = ({
    poll,
    total,
    form,
    page,
    onCanGoNext,
}: SimpleVoteProps) => {
    const onEdit = (itemId: string) => {
        form.setFieldValue(
            `${page.formikKey}`,
            poll.options.find((v) => v.id === itemId)
        );
        onCanGoNext();
    };

    const getCurrentEdit = useCallback(() => {
        const currentEdit = form.values?.[page.formikKey]?.id;
        if (currentEdit) {
            return {
                key: currentEdit,
                value: true,
            };
        }
        return;
    }, [form.values, page.formikKey]);

    useEffect(() => {
        if (getCurrentEdit()) {
            onCanGoNext();
        }
    }, [getCurrentEdit, onCanGoNext]);

    return (
        <VStack spacing={12} alignItems="flex-start">
            <VStack alignItems="flex-start">
                <ContentHeading value={poll.title} />
                <PollItemList
                    {...{ onEdit, total }}
                    items={poll.options}
                    currentEdit={getCurrentEdit()}
                />
            </VStack>
        </VStack>
    );
};
