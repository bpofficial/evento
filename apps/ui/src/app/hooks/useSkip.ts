import {useCallback} from 'react';
import {PageOptions} from "../types";
import {PagesState} from "./usePagesState";
import {calculateField} from "../utils/calculate-field";
import {useFormikContext} from "formik";

type ReturnFn = (idx: number) => number;
export type CalcInfo = { inputs: Map<string, string>, calculations: Record<string, string> };
type UseSkip = (p: PageOptions[], s: PagesState['state'], info: CalcInfo) => { next: ReturnFn, previous: ReturnFn };

export const useSkip: UseSkip = (pages: PageOptions[], state: PagesState['state'], info) => {
    const form = useFormikContext();

    // Handle skipping logic
    const shouldSkip = useCallback((page: PageOptions) => {
        if (page.skipPageCondition) {
            return calculateField(page.skipPageCondition, info.inputs, info.calculations, form);
        }
        return false;
    }, [form, info]);

    const next = useCallback((idx: number) => {
        if (state.isLastPage) return 0;
        if (shouldSkip(pages[idx + 1])) {
            if (idx + 2 > pages.length - 1) return 0;
            return idx + 2;
        }
        return idx + 1;
    }, [pages, shouldSkip, state.isLastPage])

    const previous = useCallback((idx: number) => {
        if (state.isFirstPage) return 0;
        if (shouldSkip(pages[idx - 1])) {
            if (idx - 2 < 0) return 0;
            return idx - 2;
        }
        return idx - 1;
    }, [pages, shouldSkip, state.isFirstPage])

    return {next, previous};
};
