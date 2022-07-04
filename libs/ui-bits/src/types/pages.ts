import { FormikContextType } from 'formik';
import * as Screens from '../screens';
import { ComponentProps } from 'react';

export interface PageProps {
    page: {
        currentIndex: number;
        previousIndex: number;
        currentName: string;
        formikKey: string;
    };
}

export interface PageForm<T = any> {
    form: FormikContextType<T>;
}

export interface CanGoNext extends PageProps, PageForm {
    onCanGoNext: (can?: boolean, identifier?: string) => void;
}

export interface PageAppearanceOptions {
    backButton?: {
        hide?: boolean;
    };
    primaryButton?: {
        hide?: boolean;
        text?: string;
        hideIcon?: boolean;
    };
}

export interface PageBehaviourOptions {
    skipPageCondition?: any;
    submitOnLoad?: boolean;
}

export interface PageOption<T extends keyof typeof Screens> {
    title?: string;
    type: T;
    options: Omit<
        ComponentProps<typeof Screens[T]>,
        keyof (PageProps & PageForm & CanGoNext)
    > &
        PageAppearanceOptions &
        PageBehaviourOptions;
}

export type PageOptions = PageOption<'CustomContent'>;
