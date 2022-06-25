import {useCallback} from 'react';
import {PageOptions} from "../types";
import {PagesState} from "./usePagesState";
import {useFormikContext} from "formik";
import {calculateField} from "@evento/calculations";

type ReturnFn = (idx: number) => number;
export type CalcInfo = { inputs: Map<string, string>, calculations: Record<string, string> };
type UseSkip = (p: PageOptions[], s: Omit<PagesState['state'], 'canGoNext'>, info: CalcInfo) => { next: ReturnFn, previous: ReturnFn };

export const useSkip: UseSkip = (pages, state, info) => {
    const form = useFormikContext<any>();

    // Handle skipping logic
    const shouldSkip = useCallback((page: PageOptions) => {
        if (page.options.skipPageCondition) {
            return calculateField(page.options.skipPageCondition, info.inputs, info.calculations, form.values);
        }
        return false;
    }, [form, info]);

    /**
     * Recursively skip the next or previous pages, looking ahead or behind for consecutive skips.
     */
    const recurseSkip = useCallback((idx: number, dir: -1 | 1): number => {
        const len = pages.length - 1, idx1 = idx + dir;

        // If on the first & going back or on the last page and going forward, return 0.
        if ((dir < 0 && idx <= 1) || (dir > 0 && idx >= len)) return 0;

        // Calculate a validity metric. If less than 0, then invalid action return 0.
        const cmp = dir < 0 ? Math.max(idx1, 0) : Math.max(len - idx1, 0);
        if (cmp < 0) return 0;

        if (shouldSkip(pages[idx1])) {
            return recurseSkip(idx1, dir);
        }
        return idx + dir;
    }, [pages, shouldSkip]);

    const next = useCallback((idx: number) => {
        return recurseSkip(idx, 1);
    }, [recurseSkip])

    const previous = useCallback((idx: number) => {
        return recurseSkip(idx, -1);
    }, [recurseSkip])

    return {next, previous};
};
