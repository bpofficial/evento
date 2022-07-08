import {Card} from "./components/Card";
import {ComponentProps} from "react";

const w = '100%';
const h = '100%';
export const dims = {w, h};
export const box = {...dims, borderWidth: 1, borderRadius: 4};

export const ContentTypes: Pick<ComponentProps<typeof Card>, 'title' | 'type'>[] = [
    {
        title: 'Text',
        type: 'ContentText',
    },
    {
        title: 'Heading',
        type: 'ContentHeading',
    }, {
        title: 'Spacing',
        type: 'ContentSpacing',
    }, {
        title: 'Form Input',
        type: 'ContentInput',
    }, {
        title: 'Select',
        type: 'ContentSelect',
    }, {
        title: 'MultiSelect',
        type: 'ContentMultiSelect',
    }, {
        title: 'Poll',
        type: 'ContentPoll',
    }, {
        title: 'Poll Group',
        type: 'ContentPollGroup',
    }, {
        title: 'Checkbox',
        type: 'ContentCheckbox',
    }, {
        title: 'Checkbox Group',
        type: 'ContentCheckboxGroup',
    }, {
        title: 'URL Link',
        type: 'ContentLink',
    }, {
        title: 'Payment Processing',
        type: 'ContentPayment',
    },
]
