import { useBoolean, usePrevious } from '@chakra-ui/react';
import { FormikContextType } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import * as Screens from '../screens';
import { PageProps } from '../types';
import { useButtonHandlers } from './useButtonHandlers';
import { usePageTraversal } from './usePageTraversal';
import { FormModel } from '@evento/models';
import { useModel } from './modelContext';

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
    props.onCanGoNext = (val = true, identifier = 'unknown') => {
        console.info(identifier || '', 'setting canGoNext:', val);
        val ? actions.setCanGoNext.on() : actions.setCanGoNext.off();
    };
    props.form = form;
    return props;
};

export const usePagesState = (inputs: Map<string, string>, preview = false) => {
    const model = useModel();
    const [currentIndex, setCurrentIndex] = useState(0);
    const previousIndex = usePrevious(currentIndex);
    const [transitioning, transition] = useBoolean(false);
    const [isLoading, loading] = useBoolean(false);
    const isLastPage = currentIndex === (model.pages?.length ?? 0) - 1;
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
            model,
            inputs,
            buttonHandlers,
            loading,
            transition,
            currentIndex,
            setCurrentIndex,
            preview
        });

    useEffect(() => {
        transition.off();
    }, [currentIndex, transition]);

    const currentPage = model.pages?.[currentIndex];
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
