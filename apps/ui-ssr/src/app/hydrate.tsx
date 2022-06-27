import '@babel/polyfill';
import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';
import { EventoApp } from '@evento/ui-bits';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare global {
    interface Window {
        __INITIAL__DATA__: any;
    }
}

const root = document.getElementById('root');
if (root && root.innerHTML !== '') {
    ReactDOMClient.hydrateRoot(
        root,
        <EventoApp {...(window.__INITIAL__DATA__ ?? {})} />
    );
} else {
    ReactDOM.render(<EventoApp {...(window.__INITIAL__DATA__ ?? {})} />, root);
}
