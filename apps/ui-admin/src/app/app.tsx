import { Box, ChakraProvider, Heading, HStack, VStack } from '@chakra-ui/react';
import { FormModel } from '@evento/models';
import { EventoApp } from '@evento/ui-bits';
import { useState } from 'react';

const w = '100%';
const h = '100%';
const dims = { w, h };
const box = { ...dims, borderWidth: 1, borderRadius: 4 };
const defaultPage: any = { type: 'CustomContent', options: { content: [] } };

type CardProps = { title: string; icon?: string };
const Card = ({ title, icon = '' }: CardProps) => {
    return (
        <Box
            p="4"
            borderWidth={1}
            borderRadius={2}
            w="100%"
            mb="2"
            userSelect={'none'}
            cursor="pointer"
        >
            <HStack>
                <Box userSelect={'none'}>{title}</Box>
            </HStack>
        </Box>
    );
};

export function App() {
    const [model, setModel] = useState(
        new FormModel({
            pages: [defaultPage],
        })
    );

    return (
        <ChakraProvider>
            <Box h="100%" w="100vw">
                <Box p="8" {...dims}>
                    <HStack {...dims}>
                        <VStack {...dims} align="left">
                            <Heading size="md">Elements</Heading>
                            <Box {...box} p="2" h="100%" overflowY={'scroll'}>
                                <Card title="Text" />
                                <Card title="Heading" />
                                <Card title="Spacing" />
                                <Card title="Form Input" />
                                <Card title="Select" />
                                <Card title="MultiSelect" />
                                <Card title="Poll" />
                                <Card title="Poll Group" />
                                <Card title="Checkbox" />
                                <Card title="Checkbox Group" />
                                <Card title="URL Link" />
                                <Card title="Payment Processing" />
                            </Box>
                        </VStack>
                        <VStack {...dims} align="left">
                            <Heading size="md">Configuration</Heading>
                            <Box {...box} p="2">
                                <Box {...dims}></Box>
                            </Box>
                        </VStack>
                        <VStack {...dims} align="left">
                            <Heading size="md">Preview</Heading>
                            <Box {...box}>
                                <EventoApp
                                    configuration={model.toJSON()}
                                    preview
                                />
                            </Box>
                        </VStack>
                    </HStack>
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default App;
