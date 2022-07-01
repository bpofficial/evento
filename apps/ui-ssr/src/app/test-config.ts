export const PokerCalculations = {
    payableAmount: {
        // if 'gettingPizza' === true then $5.00 else $0.00
        $cond: [{ $eq: ['$gettingPizza', true] }, 500, 0],
    },
    payableAmountDecimal: {
        $round: [{ $divide: ['$payableAmount', 100] }, 2],
    },
};

export const PokerValidations = {
    name: {
        $required: 'Name is required',
        $minLength: [3, 'Name is too short'],
        $maxLength: [255, 'Name is too long'],
    },
    email: {
        $required: [true, 'Email is required'], // GET /api/v1/forms/:formId/validate?key=abc&value=xyz
        $async: true,
    },
};

export const PokerPages: any[] = [
    {
        type: 'CustomContent',
        options: {
            content: [
                {
                    type: 'ContentHeading',
                    options: {
                        value: 'Poker Night',
                        options: {
                            textAlign: 'center',
                        },
                    },
                },
                {
                    type: 'ContentText',
                    options: {
                        value: 'Join us for some amateur poker',
                        options: {
                            textAlign: 'center',
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
                        value: 'Are you having pizza?',
                        options: { size: 'md' },
                    },
                },
                {
                    type: 'ContentSpacing',
                    options: {
                        height: '10px',
                    },
                },
                {
                    type: 'ContentCheckboxGroup',
                    options: {
                        fieldKey: 'gettingPizza',
                        items: [
                            {
                                id: '1',
                                label: 'Yes',
                                value: true,
                            },
                            {
                                id: '2',
                                label: 'No',
                                value: false,
                            },
                        ],
                    },
                },
            ],
        },
    },
    {
        type: 'CustomContent',
        options: {
            primaryButton: {
                text: 'Pay Now',
                hideIcon: true,
            },
            skipPageCondition: {
                $not: ['$payableAmount'],
            },
            content: [
                {
                    type: 'ContentHeading',
                    options: {
                        value: 'Thanks, {{name}}',
                        options: {
                            size: 'md',
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
                    type: 'ContentText',
                    options: {
                        value: `You're paying **\${{payableAmountDecimal}} AUD**`,
                    },
                },
                {
                    type: 'ContentSpacing',
                    options: {
                        height: '10px',
                    },
                },
                {
                    type: 'ContentPayment',
                    options: {
                        label: 'buy-in',
                        amount: '{{payableAmount}}', // important
                        nameFieldKey: 'name',
                        metadata: {
                            formId: '{{__FORM_ID__}}',
                            name: '{{name}}',
                        },
                        options: {
                            isRequired: true,
                        },
                    },
                },
            ],
        },
    },
    {
        type: 'CustomContent',
        options: {
            submitOnLoad: true,
            backButton: {
                hide: true,
            },
            primaryButton: {
                hide: true,
            },
            content: [
                {
                    type: 'ContentHeading',
                    options: {
                        value: 'Thank you!',
                        options: {
                            textAlign: 'center',
                        },
                    },
                },
                {
                    type: 'ContentText',
                    options: {
                        value: 'Looking forward to seeing you at Poker Night, {{name}}',
                        options: {
                            textAlign: 'center',
                        },
                    },
                },
            ],
        },
    },
];
