import {useBoolean, usePrevious} from '@chakra-ui/react';
import {FormikContextType} from 'formik';
import {useEffect, useMemo, useState} from 'react';
import {PagesProviderProps} from '../components';
import * as Screens from '../screens';
import {PageProps} from '../types';
import {CalcInfo} from "./useSkip";
import {useButtonHandlers} from "./useButtonHandlers";
import {usePageTraversal} from "./usePageTraversal";

interface CreatePageProps<T> {
    pageState: PagesState;
    form: FormikContextType<T>;
}

export const createPageProps = <T>({pageState, form}: CreatePageProps<T>) => {
    const {state, actions, currentPage} = pageState;
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

export type PagesState = ReturnType<typeof usePagesState>;

export const usePagesState = (pages: PagesProviderProps['pages'], info: CalcInfo) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const previousIndex = usePrevious(currentIndex);
    const [transitioning, transition] = useBoolean(false);
    const [isLoading, loading] = useBoolean(false);
    const isLastPage = currentIndex === pages.length - 1;
    const isFirstPage = currentIndex === 0;

    const state = useMemo(() => ({
        currentIndex,
        previousIndex,
        isLastPage,
        isFirstPage,
    }), [currentIndex, isFirstPage, isLastPage, previousIndex])

    const buttonHandlers = useButtonHandlers(loading);
    const {registerNextHandler, registerBackHandler} = buttonHandlers;
    const {nextPage, previousPage, canGoNext, setCanGoNext} = usePageTraversal({
        pages,
        state,
        info,
        buttonHandlers,
        loading,
        transition,
        currentIndex,
        setCurrentIndex
    });

    const currentPage = pages[currentIndex];
    const Component = Screens[currentPage?.type];

    useEffect(() => {
        transition.off()
    }, [currentIndex, transition])

    return {
        Component,
        currentPage,
        actions: {
            nextPage,
            previousPage,
            setCanGoNext, // enable the button
            // custom button behaviour
            registerNextHandler,
            registerBackHandler
        },
        state: {...state, canGoNext},
        isLoading,
        transitioning,
    };
};
