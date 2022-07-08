import {FormControl, FormLabel, Input, Textarea, VStack} from "@chakra-ui/react";
import {ChangeEvent} from "react";

interface ContentTextOptionsProps {
    value: any;
    onChange: (val: any) => void;
}

export const ContentTextOptions = ({value, onChange}: ContentTextOptionsProps) => {

    const handleChange = (key: string) => (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange({
            ...value,
            [key]: evt.target.value
        });
    }

    return (
        <VStack spacing={"4"}>
            <FormControl>
                <FormLabel>Form Key</FormLabel>
                <Input
                    onChange={handleChange('fieldKey')}
                    value={value?.['fieldKey'] ?? ''}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Content</FormLabel>
                <Textarea
                    noOfLines={4}
                    onChange={handleChange('value')}
                    value={value?.['value'] ?? ''}
                />
            </FormControl>
        </VStack>
    )
}
