import { PageOptions } from './types/pages';

export const Pages: PageOptions[] = [
    {
        title: '',
        type: 'MultiVote',
        options: {
            options: [
                {
                    title: 'Choose a single option',
                    options: ['Pizza', 'Drinks', 'Snacks'],
                },
                {
                    title: 'Vote for an activity',
                    options: [
                        'Secret Hitler',
                        'Nintendo Switch',
                        'XBox 360',
                        'Cards against Humanity',
                        'Captain Sonar',
                        'Dune',
                    ],
                },
            ],
        },
    },
    {
        title: '',
        type: 'EasyPayment',
        options: {},
    },
];
