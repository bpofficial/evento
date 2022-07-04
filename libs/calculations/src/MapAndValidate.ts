import { Either, isLeft, left, right } from 'fp-ts/lib/Either';
import { ValidationTypes } from './ValidationTypes';
import axios, { AxiosError } from 'axios';

type Options = { fieldKey: string; pageNumber: number; url: string };
export class MapAndValidate {
    async interpret(
        value: any,
        validation: Record<string, any> | null,
        options: Options
    ): Promise<Either<string[], true>> {
        if (!validation) return right(true);
        const promises = Object.entries(validation).map(
            async ([key, params]) => {
                let result = this.call(key, value, { [key]: params }, options);
                if (result instanceof Promise) {
                    result = await result;
                }
                return isLeft(result) ? result.left : result.right;
            }
        );
        const results = await Promise.all(promises);
        const errors = results.filter(
            (v) => typeof v === 'string'
        ) as unknown as string[];
        if (errors) return left(errors);
        return right(true);
    }

    private call(
        key: string,
        value: any,
        params: any,
        options: Options
    ): Either<string, true | Promise<Either<string, true>>> {
        switch (key) {
            case '$type':
                return this.$type(value, params);
            case '$minLength':
                return this.$minLength(value, params);
            case '$maxLength':
                return this.$maxLength(value, params);
            case '$async':
                return this.$async(value, params, options);
            case '$regex':
                return this.$regex(value, params);
            case '$extends':
                return this.$extends(value, params);
        }
        return right(true);
    }

    private $type(
        value: any,
        obj: ValidationTypes.InputType
    ): Either<string, true> {
        const [type, message] = obj.$type;
        const result = typeof value === type;
        return result ? right(true) : left(message);
    }

    private $minLength(
        value: string,
        obj: ValidationTypes.MinLength
    ): Either<string, true> {
        const [minLength, message] = obj.$minLength;
        return (value?.length ?? 0) >= minLength ? right(true) : left(message);
    }

    private $maxLength(
        value: any,
        obj: ValidationTypes.MaxLength
    ): Either<string, true> {
        const [maxLength, message] = obj.$maxLength;
        return (value?.length ?? 0) <= maxLength ? right(true) : left(message);
    }

    private $async(
        value: any,
        obj: ValidationTypes.Async,
        options: Options
    ): Either<string, Promise<Either<string, true>>> {
        try {
            const url = new URL(options.url);
            url.searchParams.set('key', options.fieldKey);
            url.searchParams.set('value', value?.toString?.() || '');
            const result: any = axios
                .get(url.toString())
                .then((res) => {
                    if (res.status.toString().startsWith('2')) {
                        return right(true);
                    }
                    return left(res.data.message);
                })
                .catch((err) => {
                    if (err instanceof AxiosError) {
                        return left(err.response?.data.message);
                    }
                    return left(err?.message);
                });
            return right(result);
        } catch (error) {
            return left((error as any).message);
        }
    }

    private $regex(
        value: any,
        obj: ValidationTypes.Regex
    ): Either<string, true> {
        return right(true);
    }

    private $extends(
        value: any,
        obj: ValidationTypes.Extends
    ): Either<string, true> {
        return right(true);
    }
}
