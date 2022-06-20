import { Text } from '@chakra-ui/react';

interface ContentTextProps {
    value: string;
    options?: {
        align?: 'left' | 'center' | 'right';
    };
}

export const ContentText = ({ value, options }: ContentTextProps) => {
    return (
        <Text w="100%" textAlign={options?.align}>
            {value}
        </Text>
    );
};
