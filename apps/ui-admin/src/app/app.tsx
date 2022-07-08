import {Box, ChakraProvider, Heading, HStack, VStack,} from '@chakra-ui/react';
import {FormModel} from '@evento/models';
import {EventoApp} from '@evento/ui-bits';
import {useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {box, dims} from "./constants";
import {ConfigurationBox} from "./components/ConfigurationBox";
import {CardProps} from "./components/Card";
import {ElementBox} from "./components/ElementsBox";
import {ElementEditor} from "./components/ElementEditor/ElementEditor";
import update from "immutability-helper";

const defaultPage: any = {type: 'CustomContent', options: {content: []}};

export function App() {
    const [selectedCard, setSelectedCard] = useState<CardProps | null>(null)
    const [model] = useState(
        new FormModel({
            pages: [defaultPage],
        })
    );

    const [currentPage, setPageContent] = useState<any[]>([]);

    const onClick = (item: CardProps) => {
        setSelectedCard(item);
    }

    const onBackClick = () => {
        setSelectedCard(null)
    }

    const onContentChange = (index: number, value: any) => {
        setPageContent(prevContent => update(prevContent, {
            $splice: [
                [index, 0, value]
            ]
        }))
    }

    return (
        <ChakraProvider>
            <Box h="100%" w="100vw">
                <Box p="8" {...dims}>
                    <DndProvider backend={HTML5Backend}>
                        <HStack {...dims}>
                            {selectedCard === null ? <ElementBox/> :
                                <ElementEditor {...{onBackClick}} item={selectedCard}
                                               value={currentPage[selectedCard.index]}
                                               onChange={onContentChange}/>}
                            <ConfigurationBox
                                cardOnClick={onClick}
                                onBackClick={onBackClick}
                                currentSelectedCardIndex={selectedCard?.index ?? -1}
                            />
                            <VStack {...dims} align="left" maxW={"400px"}>
                                <Heading size="md" userSelect={"none"}>Preview</Heading>
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
