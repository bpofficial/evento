import { createContext, useContext, useState } from 'react';
import { PageOptions } from '../types/pages';
import * as Screens from '../screens';
import { Button, Flex, VStack } from '@chakra-ui/react';
import { BsArrowRight } from 'react-icons/bs';

interface PagesProviderProps {
    pages: PageOptions[];
}

interface IPageContext extends PagesProviderProps {
    nextPage: () => void;
    previousPage: () => void;
    currentPage: PageOptions | null;
}

const PagesContext = createContext<IPageContext>({
    pages: [],
    currentPage: null,
    nextPage() {
        //
    },
    previousPage() {
        //
    },
});

export const usePages = () => {
    return useContext(PagesContext);
};

export const PagesProvider = ({ pages }: PagesProviderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const page = pages[currentIndex];
    const CurrentPage = Screens[page.type];

    const nextPage = () => {
        if (currentIndex === pages.length - 1) return;
        setCurrentIndex((x) => x + 1);
    };

    const previousPage = () => {
        if (currentIndex === 0) return;
        setCurrentIndex((x) => x - 1);
    };

    const props = page.options as any;

    return (
        <PagesContext.Provider
            value={{
                pages,
                nextPage,
                previousPage,
                currentPage: page,
            }}
        >
            <Flex
                h="100%"
                justifyContent={'space-between'}
                flexDirection="column"
            >
                <VStack alignItems="flex-start">
                    {page.title}
                    <CurrentPage {...props} />
                </VStack>
                <Button w="100%" h="14" mt="6">
                    Submit
                    <BsArrowRight
                        style={{ marginLeft: '8px', marginTop: '1px' }}
                    />
                </Button>
            </Flex>
        </PagesContext.Provider>
    );
};
