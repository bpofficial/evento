import { Text, TextProps, TypographyProps } from '@chakra-ui/react';
import { getLinksFromText } from '@evento/utils';
import { useReplaceInputValue } from '../../hooks/useReplaceInputValue';
import { ContentItem, PageForm } from '../../types';
import { ContentLink } from './Link';

interface ContentTextProps extends PageForm {
    value: string;
    options?: {
        textAlign?: TypographyProps['textAlign'];
    } & Partial<TextProps>;
}

function splitTextAtLinks(str: string, links: Map<string, RegExpMatchArray>) {
    const result: (string | ContentItem<'ContentLink'>)[] = [];

    if (!links.size) return [str];

    for (const [link, match] of links) {
        const [first, last] = str.split(link);
        str = last;
        result.push(first);
        result.push({
            type: 'ContentLink',
            options: {
                url: match[2],
                value: match[1],
            },
        });
    }
    return result;
}

export const ContentText = ({ value, options, form }: ContentTextProps) => {
    const replaced = useReplaceInputValue(value, form);
    const [str, links] = getLinksFromText(replaced);
    const contentArr = splitTextAtLinks(str, links);

    return (
        <Text w="100%" {...options}>
            {contentArr.map((c, key) => {
                switch (typeof c) {
                    case 'string':
                        return c;
                    case 'object':
                        return <ContentLink {...{ key, ...c.options }} />;
                    default:
                        return null;
                }
            })}
        </Text>
    );
};
