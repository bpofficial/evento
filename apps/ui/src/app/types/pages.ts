import {FormikContextType} from 'formik';
import * as Screens from '../screens';
import {ComponentProps} from "react";

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
    onCanGoNext: (can?: boolean) => void;
}

export interface PageOption<T extends keyof typeof Screens> {
    title?: string;
    buttonText?: string;
    type: T;
    skipPageCondition?: any;
    hideBackButton?: boolean
    hideIcon?: boolean;
    options: Omit<ComponentProps<typeof Screens[T]>,
        keyof (PageProps & PageForm & CanGoNext)>;
}

export type PageOptions = PageOption<'CustomContent'>;
