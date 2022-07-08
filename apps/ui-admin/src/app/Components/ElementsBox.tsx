import {box, ContentTypes, dims} from "../constants";
import {Box, Heading, VStack} from "@chakra-ui/react";
import {Card} from "./Card";

export const ElementBox = () => {

    const dummyClick = () => {
        // do nothing
    }

    return (
        <VStack {...dims} align="left">
            <Heading size="md" userSelect={"none"}>Elements</Heading>
            <Box
                {...box}
                p="2"
                h="100%"
                overflowY={'scroll'}
            >
                {ContentTypes.map(t => <Card onClick={dummyClick} title={t.title} type={t.type}/>)}
            </Box>
        </VStack>
    )
}
