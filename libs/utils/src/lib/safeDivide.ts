export function safeDivide(a: number, b: number) {
    if (Number.isNaN(a) || Number.isNaN(b)) return null;

    // In case of b === 0, the front end should show Inf, which would indicate the total interactions is 0
    if (b === 0) return Infinity;

    // round to 2 decimal places (https://stackoverflow.com/a/18358056)
    return +(Math.round((a / b + 'e+2') as unknown as number) + 'e-2');
}

export const divide = safeDivide;
