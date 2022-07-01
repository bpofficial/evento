/* eslint-disable @typescript-eslint/no-namespace */

export namespace ValidationTypes {
    export interface InputType {
        $type: ['string' | 'number', string];
    }

    export interface MinLength {
        $minLength: [number, string];
    }

    export interface MaxLength {
        $maxLength: [number, string];
    }

    export interface Required {
        $required: string;
    }

    export interface Async {
        $async: boolean;
    }

    export interface Regex {
        $regex: RegExp;
    }

    export interface Extends {
        $extends: string;
    }
}
