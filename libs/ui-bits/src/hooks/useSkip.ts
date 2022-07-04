import { useCallback } from 'react';
import { useFormikContext } from 'formik';
import { calculateField } from '@evento/calculations';
import { FormModel, Page } from '@evento/models';

export type CalcInfo = {
    inputs?: Map<string, string>;
    calculations?: Record<string, string>;
};
interface UseSkipProps {
    model: FormModel;
    inputs: Map<string, string>;
}

export const useSkip = ({ model, inputs }: UseSkipProps) => {
    const form = useFormikContext<any>();

    // Handle skipping logic
    const shouldSkip = useCallback(
        (page: Page) => {
            if (!page || !inputs || !model.calculations) return false;

            if (page.options['skipPageCondition']) {
                return calculateField(
                    page.options['skipPageCondition'],
                    inputs,
                    model.calculations,
                    form.values
                );
            }
            return false;
        },
        [form, model, inputs]
    );

    /**
     * Recursively skip the next or previous pages, looking ahead or behind for consecutive skips.
     */
    const recurseSkip = useCallback(
        (idx: number, dir: -1 | 1): number => {
            if (!model.pages) return 0;
            const len = model.pages.length - 1,
                idx1 = idx + dir;

            // If on the first & going back or on the last page and going forward, return 0.
            if ((dir < 0 && idx <= 1) || (dir > 0 && idx >= len)) return 0;

            // Calculate a validity metric. If less than 0, then invalid action return 0.
            const cmp = dir < 0 ? Math.max(idx1, 0) : Math.max(len - idx1, 0);
            if (cmp < 0) return 0;

            if (shouldSkip(model.pages[idx1])) {
                return recurseSkip(idx1, dir);
            }
            return idx + dir;
        },
        [model, shouldSkip]
    );

    const next = useCallback(
        (idx: number) => {
            return recurseSkip(idx, 1);
        },
        [recurseSkip]
    );

    const previous = useCallback(
        (idx: number) => {
            return recurseSkip(idx, -1);
        },
        [recurseSkip]
    );

    return { next, previous };
};
