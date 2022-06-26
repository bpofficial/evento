import React from "react";
import ReactDOM from "react-dom";
import {EventoApp} from "@evento/ui-bits";

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
    interface Window {
        __INITIAL__DATA__: any
    }
}

ReactDOM.hydrate(
    <EventoApp {...window.__INITIAL__DATA__}/>,
    document.getElementById("root")
);
