import { CanGoNext, PageForm, PageProps } from '.';
import * as ContentComponents from '../components/Content';

export interface ContentProps extends PageProps, PageForm, CanGoNext {
    fieldKey: string;
}

export interface ContentItem<T extends keyof typeof ContentComponents> {
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
    | ContentItem<'ContentSpacing'>;
