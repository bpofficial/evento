import {
    extendTheme,
    withDefaultColorScheme,
    theme as baseTheme,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
// import { generateColorScheme } from '@evento/utils';

export function useCustomTheme() {
    const [theme, setTheme] = useState<any>(extendTheme({ baseTheme }));

    useEffect(() => {
        // const primaryColor = '#5433EB';
        // let custom: { "50": string; "100": string; "200": string; "300": string; "400": string; "500": string; "600": string; "700": string; "800": string; "900": string };
        // if (primaryColor) {
        //     generateColorScheme(primaryColor, {hover: '#7F68E9'});
        // }
        // 50: '#D0C7FA',
        // 100: '#C1B5F8',
        // 200: '#B2A2F6',
        // 300: '#937DF2',
        // 400: '#7458EE',
        // 500: '#5433EB',
        // 600: '#4520E9',
        // 700: '#3B16DF',
        // 800: '#3614CC',
        // 900: '#1D0B6F',
        const custom = {
            50: '#D0C7FA',
            100: '#C1B5F8',
            200: '#B2A2F6',
            300: '#937DF2',
            400: '#7458EE',
            500: '#5433EB',
            600: '#4520E9',
            700: '#3B16DF',
            800: '#3614CC',
            900: '#1D0B6F',
        };
        setTheme(
            extendTheme(
                withDefaultColorScheme({
                    colorScheme: 'custom',
                    components: [
                        'Button',
                        'Tabs',
                        'Input',
                        'Editable',
                        'Spinner',
                        'Checkbox',
                    ],
                }),
                {
                    colors: {
                        custom,
                    },
                    shadows: {
                        outline: `0 0 0 0px`,
                    },
                    components: {
                        Input: {
                            defaultProps: {
                                ...baseTheme.components.Input.defaultProps,
                                focusBorderColor: 'custom.500',
                            },
                        },
                        Button: {
                            variants: {
                                solid: {
                                    ...baseTheme.components.Button.variants
                                        .solid,
                                    _hover: {
                                        ...((
                                            baseTheme.components.Button.variants
                                                .solid as any
                                        )?._hover ?? {}),
                                        bg: 'custom.hover',
                                    },
                                },
                            },
                            defaultProps: {
                                ...baseTheme.components.Button.defaultProps,
                                colorScheme: 'custom',
                            },
                        },
                    },
                    baseTheme,
                }
            )
        );
    }, []);

    return theme;
}
