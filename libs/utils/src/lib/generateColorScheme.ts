import { getRgb } from './getRgb';
import { convertColorToHex } from './rgbToHex';

function rgbToHex([r, g, b]: number[]) {
    return convertColorToHex(
        `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`,
        true
    );
}

export const generateColorScheme = (
    color: string,
    custom: Record<string, string> = {}
) => {
    const rgb = getRgb(color);

    const obj: any = {};
    for (let i = 0; i < 9; i++) {
        obj[`${(9 - i) * 100}`] = shade(rgb, (-5 + (i + 1)) / 10);
    }
    return {
        50: shade(rgb, -0.35),
        ...obj,
        ...custom,
    };
};

function shade([_r, _g, _b]: number[], light: number) {
    let r = _r,
        g = _g,
        b = _b;

    if (light < 0) {
        r = (1 + light) * r;
        g = (1 + light) * g;
        b = (1 + light) * b;
    } else {
        r = (1 - light) * r + light * 255;
        g = (1 - light) * g + light * 255;
        b = (1 - light) * b + light * 255;
    }

    return rgbToHex([r, g, b]);
}
