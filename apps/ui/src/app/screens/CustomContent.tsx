import { VStack } from '@chakra-ui/react';
import {
    ContentHeading,
    ContentInput,
    ContentSpacing,
    ContentText,
} from '../components';
import { CanGoNext, Content } from '../types';

interface CustomContentProps extends CanGoNext {
    content: Content[];
}

export const CustomContent = ({
    content,
    onCanGoNext,
    form,
    page,
}: CustomContentProps) => {
    return (
        <VStack w="100%" alignItems="flex-start">
            {content.map(({ type, options }, key) => {
                switch (type) {
                    case 'ContentHeading':
                        return (
                            <ContentHeading
                                {...{ key, ...options, form, page }}
                            />
                        );
                    case 'ContentText':
                        return (
                            <ContentText {...{ key, ...options, form, page }} />
                        );
                    case 'ContentInput':
                        return (
                            <ContentInput
                                {...{
                                    key,
                                    form,
                                    page,
                                    onCanGoNext,
                                    ...options,
                                }}
                            />
                        );
                    case 'ContentSpacing':
                        return (
                            <ContentSpacing
                                {...{ key, ...options, form, page }}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </VStack>
    );
};
