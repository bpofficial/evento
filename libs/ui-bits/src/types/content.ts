import { CanGoNext, PageForm, PageProps } from '.';
import { ContentComponents } from '../components';

export interface ContentFieldProps extends PageProps, PageForm {
    fieldKey: string;
    options?: {
        isRequired?: boolean;
    };
}

export type ContentType = keyof typeof ContentComponents;

export interface ContentItem<T extends ContentType> {
    type: T;
    options: Omit<
        React.ComponentProps<typeof ContentComponents[T]>,
        keyof (PageProps & PageForm & CanGoNext)
    >;
}

export type Content =
    | ContentItem<'ContentHeading'>
    | ContentItem<'ContentText'>
    | ContentItem<'ContentInput'>
    | ContentItem<'ContentSpacing'>
    | ContentItem<'ContentLink'>
    | ContentItem<'ContentCheckboxGroup'>
    | ContentItem<'ContentPollGroup'>
    | ContentItem<'ContentPayment'>;
