import { getRgb } from "./getRgb";

function colorToHex(color: number) {
    const hexadecimal = color.toString(16);
    return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
}

export function convertColorToHex(colorString: string, includeHash = true) {
    const [red, green, blue] = getRgb(colorString);
    return (
        (includeHash ? "#" : "") +
        colorToHex(red) +
        colorToHex(green) +
        colorToHex(blue)
    );
}
