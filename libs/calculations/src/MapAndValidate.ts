import { Either, isLeft, left, right } from 'fp-ts/lib/Either';
import { ValidationTypes } from './ValidationTypes';
import isEmpty from 'is-empty';

export class MapAndValidate {
    interpret(
        value: any,
        validation: Record<string, any>
    ): Either<string[], true> {
        const results = Object.entries(validation).map(([key, params]) => {
            const result = this.call(key, value, { [key]: params });
            return isLeft(result) ? result.left : result.right;
        });
        const errors = results.filter(
            (v) => typeof v === 'string'
        ) as unknown as string[];
        if (errors) return left(errors);
        return right(true);
    }

    private call(key: string, value: any, params: any): Either<string, true> {
        switch (key) {
            case '$type':
                return this.$type(value, params);
            case '$minLength':
                return this.$minLength(value, params);
            case '$maxLength':
                return this.$maxLength(value, params);
            case '$async':
                return this.$async(value, params);
            case '$required':
                return this.$required(value, params);
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
        obj: ValidationTypes.Async
    ): Either<string, true> {
        return right(true);
    }

    private $required(
        value: any,
        obj: ValidationTypes.Required
    ): Either<string, true> {
        if (!isEmpty(obj.$required)) {
            return !isEmpty(value) ? right(true) : left(obj.$required);
        }
        return right(true);
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
