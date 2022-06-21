import { Text } from '@chakra-ui/react';
import { getLinksFromText } from '@evento/utils';
import { ContentItem } from '../../types';
import { ContentLink } from './Link';

interface ContentTextProps {
    value: string;
    options?: {
        align?: 'left' | 'center' | 'right';
    };
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

export const ContentText = ({ value, options }: ContentTextProps) => {
    const [str, links] = getLinksFromText(value);
    const contentArr = splitTextAtLinks(str, links);

    return (
        <Text w="100%" textAlign={options?.align}>
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
