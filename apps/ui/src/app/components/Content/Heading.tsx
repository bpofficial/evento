import { Heading, ThemingProps, TypographyProps } from '@chakra-ui/react';
import { useReplaceInputValue } from '../../hooks/useReplaceInputValue';
import { PageForm } from '../../types';

interface ContentHeadingProps extends PageForm {
    value: string;
    options?: {
        size?: ThemingProps<'Heading'>['size'];
        textAlign?: TypographyProps['textAlign'];
    };
}

export const ContentHeading = ({
    value,
    options,
    form,
}: ContentHeadingProps) => {
    value = useReplaceInputValue(value, form);

    return (
        <Heading w="100%" {...options}>
            {value}
        </Heading>
    );
};
