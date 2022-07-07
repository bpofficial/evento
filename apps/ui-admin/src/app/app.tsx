import {Box, ChakraProvider, Heading, HStack, VStack,} from '@chakra-ui/react';
import {FormModel} from '@evento/models';
import {EventoApp} from '@evento/ui-bits';
import {useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {Card} from "./Components/Card";
import {box, dims} from "./constants";
import {ConfigurationBox} from "./Components/ConfigurationBox";

const defaultPage: any = { type: 'CustomContent', options: { content: [] } };

export function App() {
    const [model] = useState(
        new FormModel({
            pages: [defaultPage],
        })
    );

    return (
        <ChakraProvider>
            <Box h="100%" w="100vw">
                <Box p="8" {...dims}>
                    <DndProvider backend={HTML5Backend}>
                        <HStack {...dims}>
                            <VStack {...dims} align="left">
                                <Heading size="md">Elements</Heading>
                                <Box
                                    {...box}
                                    p="2"
                                    h="100%"
                                    overflowY={'scroll'}
                                >
                                    <Card title="Text" type="ContentText" />
                                    <Card
                                        title="Heading"
                                        type="ContentHeading"
                                    />
                                    <Card
                                        title="Spacing"
                                        type="ContentSpacing"
                                    />
                                    <Card
                                        title="Form Input"
                                        type="ContentInput"
                                    />
                                    <Card title="Select" type="ContentSelect" />
                                    <Card
                                        title="MultiSelect"
                                        type="ContentMultiSelect"
                                    />
                                    <Card title="Poll" type="ContentPoll" />
                                    <Card
                                        title="Poll Group"
                                        type="ContentPollGroup"
                                    />
                                    <Card
                                        title="Checkbox"
                                        type="ContentCheckbox"
                                    />
                                    <Card
                                        title="Checkbox Group"
                                        type="ContentCheckboxGroup"
                                    />
                                    <Card title="URL Link" type="ContentLink" />
                                    <Card
                                        title="Payment Processing"
                                        type="ContentPayment"
                                    />
                                </Box>
                            </VStack>
                            <ConfigurationBox />
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
                    </DndProvider>
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default App;
