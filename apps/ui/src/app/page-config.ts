import { FormikContextType } from 'formik';
import { PageOptions } from './types/pages';

export function getInputValue(
    formikKey: string,
    formik: FormikContextType<any>
) {
    const parts = formikKey.split('.');
    let value = formik.values;
    for (const part of parts) {
        value = value?.[part];
    }
    return value;
}

export function getInputFormikKey(key: string, sourcePage: number) {
    return `${sourcePage}_CustomContent.${key}`;
}

export function registerInputs(pages: PageOptions[]) {
    const inputs = new Map<string, string>();
    for (let i = 0; i < Pages.length; i++) {
        const page = pages[i];
        if (page.type === 'CustomContent') {
            for (let j = 0; j < page.options.content.length; j++) {
                const content = page.options.content[j];
                if (content.type === 'ContentInput') {
                    const key = content.options.fieldKey;
                    inputs.set(key, getInputFormikKey(key, i));
                }
            }
        }
    }
    return inputs;
}

export const Pages: PageOptions[] = [
    {
        type: 'CustomContent',
        options: {
            content: [
                {
                    type: 'ContentHeading',
                    options: {
                        value: 'Welcome!',
                        options: {
                            align: 'center',
                        },
                    },
                },
                {
                    type: 'ContentText',
                    options: {
                        value: 'Join us for a little board game night',
                        options: {
                            align: 'center',
                        },
                    },
                },
                {
                    type: 'ContentSpacing',
                    options: {
                        height: '20px',
                    },
                },
                {
                    type: 'ContentInput',
                    options: {
                        label: 'Your Name',
                        fieldKey: 'name',
                        options: {
                            autoFocus: true,
                        },
                    },
                },
            ],
        },
    },
    {
        type: 'MultiVote',
        options: {
            options: [
                {
                    title: 'Choose a single option',
                    options: [
                        {
                            id: '1',
                            name: 'Pizza',
                            completed: {
                                completedAt: '',
                                completedBy: 'Brayden',
                                anonymous: false,
                            },
                        },
                        { id: '2', name: 'Drinks' },
                        { id: '3', name: 'Snacks' },
                    ],
                },
                {
                    title: 'Vote for an activity',
                    options: [
                        { id: '4', name: 'Secret Hitler' },
                        { id: '5', name: 'Nintendo Switch' },
                        { id: '6', name: 'XBox 360' },
                        { id: '7', name: 'Cards against Humanity' },
                        { id: '8', name: 'Captain Sonar' },
                        { id: '9', name: 'Dune' },
                    ],
                },
            ],
        },
    },
    {
        type: 'SimplePoll',
        options: {
            poll: {
                title: 'When do you expect to arrive?',
                options: [
                    {
                        id: '10',
                        name: '4-5pm',
                        count: 0,
                    },
                    {
                        id: '11',
                        name: '5-6pm',
                        count: 3,
                    },
                    {
                        id: '12',
                        name: '7-8pm',
                        count: 9,
                    },
                    {
                        id: '13',
                        name: '8-9pm',
                        count: 12,
                    },
                ],
            },
            total: 39,
            allowCustomOptions: false,
        },
    },
];
