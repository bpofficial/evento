import {box, dims} from "../../constants";
import {Box, Heading, HStack, VStack} from "@chakra-ui/react";
import {BsArrowLeft} from "react-icons/bs";
import {CardProps} from "../Card";
import {ContentTextOptions} from "./ContentTextOptions";

interface ElementsEditorProps {
    item: CardProps
    onBackClick: () => void;
    value: any;
    onChange: (index: number, val: any) => void;
}

export const ElementEditor = ({item, onBackClick, value, onChange}: ElementsEditorProps) => {

    const getEditorElement = () => {
        if (item.type === 'ContentText') {
            return <ContentTextOptions onChange={(val) => onChange(item.index ?? -1, val)} value={value}/>
        }
        return null;
    }

    return (
        <VStack {...dims} align="left" userSelect={"none"}>
            <Heading size="md">Element Editor</Heading>
            <Box
                {...box}
                px="4"
                py="2"
                h="100%"
                overflowY={'scroll'}
            >
                <VStack align={"left"} spacing={"4"}>
                    <HStack onClick={onBackClick} cursor={"pointer"}>
                        <BsArrowLeft/>
                        <Box fontWeight="600">Back to Elements</Box>
                    </HStack>
                    <HStack align={"left"}>
                        <Heading size={"md"}>{item.title}</Heading>
                    </HStack>
                    {getEditorElement()}
                </VStack>
            </Box>
        </VStack>
    )
}
