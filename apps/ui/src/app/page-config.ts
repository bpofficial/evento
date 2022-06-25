// const GenericPages: PageOptions[] = [
//     {
//         type: 'CustomContent',
//         options: {
//             content: [
//                 {
//                     type: 'ContentHeading',
//                     options: {
//                         value: 'Welcome!',
//                         options: {
//                             textAlign: 'center',
//                         },
//                     },
//                 },
//                 {
//                     type: 'ContentText',
//                     options: {
//                         value: 'Join us for a little board game night',
//                         options: {
//                             textAlign: 'center',
//                         },
//                     },
//                 },
//                 {
//                     type: 'ContentSpacing',
//                     options: {
//                         height: '20px',
//                     },
//                 },
//                 {
//                     type: 'ContentInput',
//                     options: {
//                         label: 'Your Name',
//                         fieldKey: 'name',
//                         options: {
//                             autoComplete: 'given-name',
//                             autoFocus: true,
//                             isRequired: true,
//                             helperText:
//                                 'Enter your first name to help us identify you',
//                         },
//                     },
//                 },
//                 {
//                     type: 'ContentSpacing',
//                     options: {
//                         height: '10px',
//                     },
//                 },
//                 {
//                     type: 'ContentInput',
//                     options: {
//                         label: 'Phone Number',
//                         fieldKey: 'mobile',
//                         options: {
//                             autoComplete: 'tel',
//                             isRequired: true,
//                             helperText:
//                                 'Enter your phone in case we need to contact you',
//                         },
//                     },
//                 },
//                 // {
//                 //     type: 'ContentSpacing',
//                 //     options: {
//                 //         height: '10px',
//                 //     },
//                 // },
//                 // {
//                 //     type: 'ContentInput',
//                 //     options: {
//                 //         label: 'Email Address',
//                 //         fieldKey: 'email',
//                 //         options: {
//                 //             autoComplete: 'email',
//                 //             isRequired: true,
//                 //             helperText:
//                 //                 'Enter your email to help us contact you',
//                 //         },
//                 //     },
//                 // },
//             ],
//         },
//     },
//     {
//         type: 'CustomContent',
//         options: {
//             content: [
//                 {
//                     type: 'ContentHeading',
//                     options: {
//                         value: 'Choose a single option',
//                         options: {
//                             size: 'md',
//                         },
//                     },
//                 },
//                 {
//                     type: 'ContentCheckboxGroup',
//                     options: {
//                         fieldKey: 'food',
//                         options: {
//                             isRequired: true,
//                         },
//                         items: [
//                             { id: '1', label: 'Pizza', value: 'pizza' },
//                             { id: '2', label: 'Drinks', value: 'drinks' },
//                             { id: '3', label: 'Snacks', value: 'snacks' },
//                         ],
//                     },
//                 },
//                 {
//                     type: 'ContentSpacing',
//                     options: {
//                         height: '20px',
//                     },
//                 },
//                 {
//                     type: 'ContentHeading',
//                     options: {
//                         value: 'When do you expect to arrive?',
//                         options: {
//                             size: 'md',
//                         },
//                     },
//                 },
//                 {
//                     type: 'ContentPollGroup',
//                     options: {
//                         fieldKey: 'arrival',
//                         options: {
//                             isRequired: true,
//                         },
//                         totalPolls: 24,
//                         items: [
//                             {
//                                 id: '10',
//                                 label: '4-5pm',
//                                 count: 0,
//                             },
//                             {
//                                 id: '11',
//                                 label: '5-6pm',
//                                 count: 3,
//                             },
//                             {
//                                 id: '12',
//                                 label: '7-8pm',
//                                 count: 9,
//                             },
//                             {
//                                 id: '13',
//                                 label: '8-9pm',
//                                 count: 12,
//                             },
//                         ],
//                     },
//                 },
//             ],
//         },
//     },
//     {
//         type: 'CustomContent',
//         buttonText: 'Pay Now',
//         options: {
//             content: [
//                 {
//                     type: 'ContentHeading',
//                     options: {
//                         value: 'Place a tip',
//                         options: {
//                             size: 'md',
//                         },
//                     },
//                 },
//                 {
//                     type: 'ContentSpacing',
//                     options: {
//                         height: '10px',
//                     },
//                 },
//                 {
//                     type: 'ContentPayment',
//                     options: {
//                         label: 'Donation',
//                         amount: 500,
//                     },
//                 },
//             ],
//         },
//     },
// ];
const Calculations = {
    payableAmount: {
        // if 'gettingPizza' === true then $5.00 else $0.00
        $cond: [{$eq: ['$gettingPizza', true]}, 500, 0],
    },
};

const PokerPages: any[] = [
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
                        options: {size: 'md'},
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
                text: "Pay Now",
                hideIcon: true
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
                    type: 'ContentPayment',
                    options: {
                        label: 'buy-in',
                        amount: '{{payableAmount}}',
                        nameFieldKey: 'name',
                        options: {
                            isRequired: true
                        }
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
                hide: true
            },
            primaryButton: {
                hide: true
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

export const Configuration = {
    Meta: {
        title: 'Poker Night',
    },
    Pages: PokerPages,
    Calculations,
};
