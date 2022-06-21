import { VStack } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import {
    ContentCheckboxGroup,
    ContentHeading,
    ContentInput,
    ContentLink,
    ContentPollGroup,
    ContentSpacing,
    ContentText,
} from '../components';
import { usePages } from '../hooks/pageContext';
import { CanGoNext, Content } from '../types';
import { validatePageRequirements } from '../utils';

interface CustomContentProps extends CanGoNext {
    content: Content[];
}

export const CustomContent = ({
    content,
    onCanGoNext,
    form,
    page,
}: CustomContentProps) => {
    const { pages } = usePages();

    const inputsAreValid = useMemo(() => {
        const currentPage = pages[page.currentIndex];
        if (currentPage.type === 'CustomContent') {
            return (
                validatePageRequirements(
                    currentPage,
                    page.currentIndex,
                    form
                ) === true
            );
        }
        return true;
    }, [pages, page.currentIndex, form]);

    useEffect(() => {
        onCanGoNext(inputsAreValid);
    }, [
        inputsAreValid,
        form,
        form.values,
        onCanGoNext,
        page.currentIndex,
        pages,
    ]);

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
                    case 'ContentLink':
                        return (
                            <ContentLink {...{ key, ...options, form, page }} />
                        );
                    case 'ContentCheckboxGroup':
                        return (
                            <ContentCheckboxGroup
                                {...{ key, ...options, form, page }}
                            />
                        );
                    case 'ContentPollGroup':
                        return (
                            <ContentPollGroup
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
