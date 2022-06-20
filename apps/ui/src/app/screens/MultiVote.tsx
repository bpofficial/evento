import { Heading, VStack } from '@chakra-ui/react';
import { VoteItemList } from '../components';
import { useEffect, useState } from 'react';
import { CanGoNext, ClaimableVoteOption, Vote, VoteOption } from '../types';

interface MultiVoteProps extends CanGoNext {
    options: Vote<VoteOption | ClaimableVoteOption>[];
}

export const MultiVote = ({
    options,
    form,
    page,
    onCanGoNext,
}: MultiVoteProps) => {
    const [edited, setEdited] = useState<boolean[]>(options.map(() => false));

    const onEdit = (voteIdx: number) => (itemId: string) => {
        const newEdited = [...edited];
        newEdited[voteIdx] = true;
        setEdited(newEdited);

        form.setFieldValue(
            `${page.formikKey}.${voteIdx}`,
            options[voteIdx].options.find((v) => v.id === itemId)
        );
    };

    const getCurrentEdit = (voteIdx: number) => {
        const currentEdit = form.values?.[page.formikKey]?.[voteIdx]?.['id'];
        if (currentEdit) {
            return {
                key: currentEdit,
                value: true,
            };
        }
        return;
    };

    useEffect(() => {
        if (edited.every((v) => v)) {
            onCanGoNext();
        }
    }, [edited, onCanGoNext]);

    return (
        <VStack spacing={12} alignItems="flex-start">
            {options.map(({ title, options: opts }, key) => (
                <VStack alignItems="flex-start" {...{ key }}>
                    <Heading size="lg">{title}</Heading>
                    <VoteItemList
                        items={opts}
                        onEdit={onEdit(key)}
                        currentEdit={getCurrentEdit(key)}
                    />
                </VStack>
            ))}
        </VStack>
    );
};
