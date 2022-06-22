import { useBoolean, usePrevious } from '@chakra-ui/react';
import { FormikContextType } from 'formik';
import { useState } from 'react';
import { PagesProviderProps } from '../components/Pages';
import * as Screens from '../screens';
import { PageProps } from '../types';

interface CreatePageProps<T> {
    pageState: PagesState;
    form: FormikContextType<T>;
}

export const createPageProps = <T>({ pageState, form }: CreatePageProps<T>) => {
    const { state, actions, currentPage } = pageState;
    const page: PageProps['page'] = {
        currentIndex: state.currentIndex,
        previousIndex: state.previousIndex,
        currentName: currentPage.type,
        formikKey: `${state.currentIndex}_${currentPage.type}`,
    };

    const props = currentPage.options as any;
    props.page = page;
    props.onCanGoNext = (val = true) => {
        val ? actions.setGoNext.on() : actions.setGoNext.off();
    };
    props.form = form;

    return props;
};

export type PagesState = ReturnType<typeof usePagesState>;

export const usePagesState = (pages: PagesProviderProps['pages']) => {
    const [canGoNext, setGoNext] = useBoolean();
    const [currentIndex, setCurrentIndex] = useState(0);
    const previousIndex = usePrevious(currentIndex);

    const currentPage = pages[currentIndex];
    const Component = Screens[currentPage.type];

    const isLastPage = currentIndex === pages.length - 1;
    const isFirstPage = currentIndex === 0;

    const nextPage = () => {
        setGoNext.off();
        if (isLastPage) return;
        setCurrentIndex((x) => x + 1);
    };

    const previousPage = () => {
        setGoNext.on();
        if (isFirstPage) return;
        setCurrentIndex((x) => x - 1);
    };

    return {
        Component,
        currentPage,
        actions: {
            nextPage,
            previousPage,
            setGoNext,
        },
        state: {
            canGoNext,
            currentIndex,
            previousIndex,
            isLastPage,
            isFirstPage,
        },
    };
};
