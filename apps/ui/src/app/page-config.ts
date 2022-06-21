import { PageOptions } from './types/pages';

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
                            autoComplete: 'given-name',
                            autoFocus: true,
                            isRequired: true,
                            helperText:
                                'Enter your first name to help us identify you',
                        },
                    },
                },
                {
                    type: 'ContentSpacing',
                    options: {
                        height: '10px',
                    },
                },
                {
                    type: 'ContentInput',
                    options: {
                        label: 'Phone Number',
                        fieldKey: 'mobile',
                        options: {
                            autoComplete: 'tel',
                            isRequired: true,
                            helperText:
                                'Enter your phone in case we need to contact you',
                        },
                    },
                },
            ],
        },
    },
    {
        type: 'CustomContent',
        options: {
            content: [
                {
                    type: 'ContentHeading',
                    options: {
                        value: 'Choose a single option',
                    },
                },
                {
                    type: 'ContentSpacing',
                    options: {
                        height: '4px',
                    },
                },
                {
                    type: 'ContentCheckboxGroup',
                    options: {
                        fieldKey: 'food',
                        options: {
                            isRequired: true,
                        },
                        items: [
                            { id: '1', label: 'Pizza' },
                            { id: '2', label: 'Drinks' },
                            { id: '3', label: 'Snacks' },
                        ],
                    },
                },
                {
                    type: 'ContentSpacing',
                    options: {
                        height: '20px',
                    },
                },
                {
                    type: 'ContentHeading',
                    options: {
                        value: 'When do you expect to arrive?',
                    },
                },
                {
                    type: 'ContentSpacing',
                    options: {
                        height: '4px',
                    },
                },
                {
                    type: 'ContentPollGroup',
                    options: {
                        fieldKey: 'arrival',
                        options: {
                            isRequired: true,
                        },
                        totalPolls: 24,
                        items: [
                            {
                                id: '10',
                                label: '4-5pm',
                                count: 0,
                            },
                            {
                                id: '11',
                                label: '5-6pm',
                                count: 3,
                            },
                            {
                                id: '12',
                                label: '7-8pm',
                                count: 9,
                            },
                            {
                                id: '13',
                                label: '8-9pm',
                                count: 12,
                            },
                        ],
                    },
                },
            ],
        },
    },
];
