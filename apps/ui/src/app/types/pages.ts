import { FormikContextType } from 'formik';
import * as Screens from '../screens';

export interface PageProps {
    page: { currentIndex: number; currentName: string; formikKey: string };
}

export interface PageForm<T = any> {
    form: FormikContextType<T>;
}

export interface CanGoNext extends PageProps, PageForm {
    onCanGoNext: (can?: boolean) => void;
}

export interface PageOption<T extends keyof typeof Screens> {
    title?: string;
    type: T;
    options: Omit<
        React.ComponentProps<typeof Screens[T]>,
        keyof (PageProps & PageForm & CanGoNext)
    >;
}

export type PageOptions =
    | PageOption<'AllEvents'>
    | PageOption<'EasyPayment'>
    | PageOption<'ScanQR'>
    | PageOption<'CustomContent'>;
