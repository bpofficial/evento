import {EventoApp} from "@evento/ui-bits";
import {environment} from "../environments/environment";

export const App = () => {
    // not SSR
    const configuration = {} as any;

    return <EventoApp {...{configuration, environment, helmet: {} as any}} />
}
