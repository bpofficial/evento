import { Heading } from '@chakra-ui/react';

interface ContentHeadingProps {
    value: string;
    options?: {
        align?: 'left' | 'center' | 'right';
    };
}

export const ContentHeading = ({ value, options }: ContentHeadingProps) => {
    return (
        <Heading size="lg" w="100%" textAlign={options?.align}>
            {value}
        </Heading>
    );
};
