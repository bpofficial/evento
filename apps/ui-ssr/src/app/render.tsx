import {renderToString} from "react-dom/server";
import {readFileSync} from "fs";
import {HelmetData} from "react-helmet";
import {HelmetProvider} from "react-helmet-async";
import {ComponentPropsWithoutRef, ElementType} from "react";
import {resolve} from 'path';

const html = readFileSync(resolve(__dirname, "../assets/index.html")).toString();

export interface RenderContext<T extends ElementType> {
    props: ComponentPropsWithoutRef<T>
    helmet?: Partial<Record<keyof HelmetData, string>>;
}

export const renderApplication = <T extends ElementType>(Tree: T, context: RenderContext<T>) => {
    const markup = renderToString(
        <HelmetProvider context={context}>
            <Tree {...(context.props ?? {}) as any} />
        </HelmetProvider>
    );

    const helmet: HelmetData | undefined = context?.helmet as unknown as HelmetData;
    return html
        .replace('<div id="root"></div>', `<div style="height: 100%" id="root">${markup}</div>`)
        .replace("<title>Ui</title>", helmet?.['title']?.toString?.() || '')
        .replace("</head>", `${helmet?.['meta']?.toString?.() || ''}</head>`)
        .replace("</head>", `${helmet?.['link']?.toString?.() || ''}</head>`)
        .replace("<body>", `<body ${helmet?.['bodyAttributes']?.toString?.() || ''}>`);
};
