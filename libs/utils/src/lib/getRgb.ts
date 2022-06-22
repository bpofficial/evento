import * as colorNames from 'color-name';

const ABBR_RE = /^#([\da-f])([\da-f])([\da-f])([\da-f])?$/i;
const HEX_RE = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})?$/i;
const PERCENT_RE =
    /^rgba?\(\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*,\s*([+-]?[\d.]+)%\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/i;
const RGBA_RE =
    /^rgba?\(\s*(1?\d{1,2}|2[0-4]\d|25[0-5])\s*,\s*(1?\d{1,2}|2[0-4]\d|25[0-5])\s*,\s*(1?\d{1,2}|2[0-4]\d|25[0-5])\s*(?:,\s*([+-]?[\d.]+)\s*)?\)$/i;

function is0to255(num: number): boolean {
    if (!Number.isInteger(num)) return false;
    return num >= 0 && num <= 255;
}

/**
 * Converts given string into RGB array
 *
 * @param {string} colorString - color string, like 'blue', "#FFF", "rgba(200, 60, 60, 0.3)", "rgb(200, 200, 200)", "rgb(0%, 0%, 100%)"
 */
export function getRgb(colorString: string): [number, number, number] {
    // short paths
    const string = colorString.trim() as keyof typeof colorNames;
    if (string in colorNames) return colorNames[string];
    if (/transparent/i.test(string)) return [0, 0, 0];

    // we don't need to recheck values because they are enforced by regexes
    let match = ABBR_RE.exec(string);
    if (match) {
        return match.slice(1, 4).map((c) => parseInt(c + c, 16)) as [
            number,
            number,
            number
        ];
    }
    if ((match = HEX_RE.exec(string))) {
        return match.slice(1, 4).map((v) => parseInt(v, 16)) as [
            number,
            number,
            number
        ];
    }
    if ((match = RGBA_RE.exec(string))) {
        return match.slice(1, 4).map((c) => parseInt(c, 10)) as [
            number,
            number,
            number
        ];
    }
    if ((match = PERCENT_RE.exec(string))) {
        return match.slice(1, 4).map((c) => {
            const r = Math.round(parseFloat(c) * 2.55);
            if (is0to255(r)) return r;
            throw new Error(
                `Invalid color value "${colorString}": value ${c}% (${r}) is not between 0 and 255`
            );
        }) as [number, number, number];
    }

    throw new Error(
        `Invalid color value "${colorString}": unknown format - must be something like 'blue', "#FFF", "rgba(200, 60, 60, 0.3)", "rgb(200, 200, 200)", "rgb(0%, 0%, 100%)"`
    );
}
