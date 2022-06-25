import { Box, Button, HStack } from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';

interface ContentLinkProps {
    url: string;
    value: string;
    options?: {
        fullWidth?: boolean;
        align?: 'left' | 'center' | 'right';
    };
}

export const ContentLink = ({ value, url, options }: ContentLinkProps) => {
    return (
        <Button
            as="a"
            href={url}
            target="blank"
            rel="noreferrer"
            variant="link"
            w={options?.fullWidth ? '100%' : undefined}
            textAlign={options?.align}
        >
            <HStack>
                <Box>{value}</Box>
                <FiExternalLink />
            </HStack>
        </Button>
    );
};
