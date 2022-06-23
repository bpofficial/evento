import {useState} from "react";
import {useBoolean} from "@chakra-ui/react";


export type CustomButtonHandler = (() => Promise<boolean> | boolean) | null;
type ButtonHandlerState = { prev: CustomButtonHandler, next: CustomButtonHandler };

export const useButtonHandlers = (loading: ReturnType<typeof useBoolean>[1]) => {

    const [buttonHandler, registerButtonHandler] = useState<ButtonHandlerState>({prev: null, next: null});

    const clearButtonHandlers = () => {
        registerButtonHandler({prev: null, next: null});
    }

    const registerNextHandler = (fn: CustomButtonHandler | null) => {
        registerButtonHandler(v => ({...(v ?? {}), next: fn}));
    }

    const registerBackHandler = (fn: CustomButtonHandler | null) => {
        registerButtonHandler(v => ({...(v ?? {}), prev: fn}));
    }

    const handlePress = (op: 'prev' | 'next', defaultFn: () => void) => {
        if (typeof buttonHandler?.[op] === 'function') {
            const result = buttonHandler?.[op]?.();
            if (typeof result === 'object') {
                // On pressing the button, do the action
                loading.on()
                result.then((shouldGoNext: boolean) => {
                    if (shouldGoNext) {
                        defaultFn()
                    }
                }).finally(() => {
                    setTimeout(() => {
                        loading.off();
                    }, 5000)
                })
            } else if (result) {
                defaultFn()
            }
        } else {
            defaultFn()
        }
    }

    return {
        clearButtonHandlers,
        registerNextHandler,
        registerBackHandler,
        handlePress
    }
}
