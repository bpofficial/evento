import {VStack} from '@chakra-ui/react';
import {
    ContentCheckboxGroup,
    ContentHeading,
    ContentInput,
    ContentLink,
    ContentPayment,
    ContentPollGroup,
    ContentSpacing,
    ContentText,
} from '../components';
import {useCustomContent} from '../hooks/useCustomContent';
import {CanGoNext, Content} from '../types';
import useSSR from "use-ssr";

interface CustomContentProps extends CanGoNext {
    content: Content[];
}

export const CustomContent = ({
                                  content,
                                  onCanGoNext,
                                  form,
                                  page,
                              }: CustomContentProps) => {
    const ssr = useSSR()
    console.log({ssr});
    useCustomContent(onCanGoNext);

    return (
        <VStack w="100%" h="100%" alignItems="flex-start">
            {content.map(({type, options}, key) => {
                switch (type) {
                    case 'ContentHeading':
                        return (
                            <ContentHeading
                                {...{key, ...options, form, page}}
                            />
                        );
                    case 'ContentText':
                        return (
                            <ContentText {...{key, ...options, form, page}} />
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
                                {...{key, ...options, form, page}}
                            />
                        );
                    case 'ContentLink':
                        return (
                            <ContentLink {...{key, ...options, form, page}} />
                        );
                    case 'ContentCheckboxGroup':
                        return (
                            <ContentCheckboxGroup
                                {...{key, ...options, form, page}}
                            />
                        );
                    case 'ContentPollGroup':
                        return (
                            <ContentPollGroup
                                {...{key, ...options, form, page}}
                            />
                        );
                    case 'ContentPayment':
                        return (
                            <ContentPayment
                                {...{key, ...options, form, page}}
                            />
                        );
                    default:
                        return null;
                }
            })}
        </VStack>
    );
};
