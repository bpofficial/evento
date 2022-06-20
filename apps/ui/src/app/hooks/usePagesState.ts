import { useBoolean } from '@chakra-ui/react';
import { FormikContextType } from 'formik';
import { useState } from 'react';
import * as Screens from '../screens';
import { PageOptions, PageProps } from '../types';
import { PagesProviderProps } from './usePages';

interface CreatePageProps<T> {
    state: PagesState['state'];
    screen: PageOptions;
    actions: PagesState['actions'];
    form: FormikContextType<T>;
}

export const createPageProps = <T>({
    state,
    screen,
    actions,
    form,
}: CreatePageProps<T>) => {
    const page: PageProps['page'] = {
        currentIndex: state.currentIndex,
        currentName: screen.type,
        formikKey: `${state.currentIndex}_${screen.type}`,
    };

    const props = screen.options as any;
    props.page = page;
    props.onCanGoNext = () => actions.setGoNext.on();
    props.form = { form };

    return props;
};

type PagesState = ReturnType<typeof usePagesState>;

export const usePagesState = (pages: PagesProviderProps['pages']) => {
    const [canGoNext, setGoNext] = useBoolean();
    const [currentIndex, setCurrentIndex] = useState(0);

    const screen = pages[currentIndex];
    const CurrentPage = Screens[screen.type];

    const isLastPage = currentIndex === pages.length - 1;
    const isFirstPage = currentIndex === 0;

    const nextPage = () => {
        setGoNext.off();
        if (isLastPage) return;
        setCurrentIndex((x) => x + 1);
    };

    const previousPage = () => {
        setGoNext.off();
        if (isFirstPage) return;
        setCurrentIndex((x) => x - 1);
    };

    return {
        CurrentPage,
        screen,
        actions: {
            nextPage,
            previousPage,
            setGoNext,
        },
        state: {
            canGoNext,
            currentIndex,
            isLastPage,
            isFirstPage,
        },
    };
};
