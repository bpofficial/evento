import { renderToString } from 'react-dom/server';
import { readFileSync } from 'fs';
import { ComponentPropsWithoutRef, ElementType, StrictMode } from 'react';
import { resolve } from 'path';
import { RootComponentHelmetData } from '@evento/ui-bits';
import { ColorModeScript } from '@chakra-ui/react';

const html = readFileSync(resolve(__dirname, './assets/index.html')).toString();

export interface RenderContext<T extends ElementType> {
    props: ComponentPropsWithoutRef<T> & RootComponentHelmetData;
}

export const renderApplication = <T extends ElementType>(
    Tree: T,
    context: RenderContext<T>
) => {
    const markup = renderToString(
        <StrictMode>
            <ColorModeScript />
            <Tree {...((context.props ?? {}) as any)} />
        </StrictMode>
    );

    return html
        .replace(
            `<title>Ui</title>`,
            `<title>${context.props?.helmet?.title ?? 'Evento'}</title>`
        )
        .replace(
            '<div id="root"></div>',
            `<div style="height: 100%" id="root">${markup}</div>`
        )
        .replace(
            '</head>',
            `<script>window.__INITIAL__DATA__ = ${JSON.stringify(
                context.props
            )};</script>
            </head>`
        );
};
