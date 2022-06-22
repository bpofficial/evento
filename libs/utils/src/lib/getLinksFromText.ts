export function getLinksFromText(
    str: string
): [string, Map<string, RegExpMatchArray>] {
    const matches = str.match(/\[([^[]+)](\(.*\))/gm);
    if (!matches) return [str, new Map()];

    const singleMatch = /\[([^[]+)]\((.*)\)/;

    const links = new Map<string, RegExpMatchArray>();
    for (let i = 0; i < matches.length; i++) {
        const text = singleMatch.exec(matches[i]);
        if (!text) continue;
        links.set(text[0], text);
    }
    return [str, links];
}
