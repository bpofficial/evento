import { useBoolean, usePrevious } from '@chakra-ui/react';
import { FormikContextType } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { PagesProviderProps } from '../components';
import * as Screens from '../screens';
import { PageProps } from '../types';
import { CalcInfo } from './useSkip';
import { useButtonHandlers } from './useButtonHandlers';
import { usePageTraversal } from './usePageTraversal';

interface CreatePageProps<T> {
    pageState: ReturnType<typeof usePagesState>;
    form: FormikContextType<T>;
}

export type PageState = CreatePageProps<any>['pageState'];

export const createPageProps = <T>({ pageState, form }: CreatePageProps<T>) => {
    if (!pageState) return {};

    const { actions, currentPage, state } = pageState;
    const page: PageProps['page'] = {
        currentIndex: state.currentIndex,
        previousIndex: state.previousIndex,
        currentName: currentPage.type,
        formikKey: `${state.currentIndex}_${currentPage.type}`,
    };

    const props = currentPage.options as any;
    props.page = page;
    props.onCanGoNext = (val = true) => {
        val ? actions.setCanGoNext.on() : actions.setCanGoNext.off();
    };
    props.form = form;
    return props;
};

export const usePagesState = (
    pages?: PagesProviderProps['configuration']['pages'],
    info?: CalcInfo
) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const previousIndex = usePrevious(currentIndex);
    const [transitioning, transition] = useBoolean(false);
    const [isLoading, loading] = useBoolean(false);
    const isLastPage = currentIndex === (pages?.length ?? 0) - 1;
    const isFirstPage = currentIndex === 0;

    const state = useMemo(
        () => ({
            currentIndex,
            previousIndex,
            isLastPage,
            isFirstPage,
        }),
        [currentIndex, isFirstPage, isLastPage, previousIndex]
    );

    const buttonHandlers = useButtonHandlers(loading);
    const { registerNextHandler, registerBackHandler } = buttonHandlers;
    const { nextPage, previousPage, canGoNext, setCanGoNext } =
        usePageTraversal({
            pages: pages as any,
            info,
            buttonHandlers,
            loading,
            transition,
            currentIndex,
            setCurrentIndex,
        });

    useEffect(() => {
        transition.off();
    }, [currentIndex, transition]);

    const currentPage = pages?.[currentIndex];
    if (!currentPage) return null;

    const type: keyof typeof Screens = currentPage.type as keyof typeof Screens;
    const Component = Screens[type];

    return {
        Component,
        currentPage,
        actions: {
            nextPage,
            previousPage,
            setCanGoNext, // enable the button
            // custom button behaviour
            registerNextHandler,
            registerBackHandler,
        },
        state: { ...state, canGoNext },
        isLoading,
        transitioning,
    };
};
