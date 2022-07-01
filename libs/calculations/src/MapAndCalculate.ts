import { timeStamp } from 'console';
import { CalculationTypes } from './CalculationTypes';

export class MapAndCalculate {
    constructor(
        private readonly values: Map<string, string | number | boolean>
    ) {
        //
    }

    interpret(value: any): any {
        if (typeof value === 'object') {
            if (value instanceof Array) {
                return value.map((v) => this.interpret(v));
            }
            const keys = Object.keys(value);
            if (keys.length) {
                const [key] = keys;
                if (key[0] === '$') {
                    // is an operation
                    return this.interpret(
                        this.call(key, { [key]: value[key] })
                    );
                }
            }
        } else if (typeof value === 'string') {
            if (value[0] === '$') {
                const key = value.slice(1);
                if (this.values.has(key)) {
                    return this.interpret(this.values.get(key));
                } else {
                    // console.log(`Field '${key}' not yet input`);
                }
            }
        }
        return value;
    }

    private call(key: string, params: any) {
        switch (key) {
            case '$cond':
                return this.$cond(params);
            case '$eq':
                return this.$eq(params);
            case '$ne':
                return this.$ne(params);
            case '$gt':
                return this.$gt(params);
            case '$gte':
                return this.$gte(params);
            case '$lt':
                return this.$lt(params);
            case '$lte':
                return this.$lte(params);
            case '$or':
                return this.$or(params);
            case '$and':
                return this.$and(params);
            case '$not':
                return this.$not(params);
            case '$includes':
                return this.$includes(params);
            case '$round':
                return this.$round(params);
            case '$divide':
                return this.$divide(params);
            case '$multiple':
                return this.multiply(params);
            case '$literal':
                return this.$literal(params);
        }
    }

    private $cond(obj: CalculationTypes.Cond) {
        const cond = [...obj.$cond];
        cond[0] = this.interpret(cond[0]);
        cond[1] = this.interpret(cond[1]);
        cond[2] = this.interpret(cond[2]);
        return cond[0] ? cond[1] : cond[2];
    }

    private $eq(obj: CalculationTypes.Eq) {
        return this.interpret(obj.$eq[0]) === this.interpret(obj.$eq[1]);
    }

    private $ne(obj: CalculationTypes.Ne) {
        return this.interpret(obj.$ne[0]) !== this.interpret(obj.$ne[1]);
    }

    private $gt(obj: CalculationTypes.Gt) {
        return this.interpret(obj.$gt[0]) > this.interpret(obj.$gt[1]);
    }

    private $gte(obj: CalculationTypes.Gte) {
        return this.interpret(obj.$gte[0]) >= this.interpret(obj.$gte[1]);
    }

    private $lt(obj: CalculationTypes.Lt) {
        return this.interpret(obj.$lt[0]) > this.interpret(obj.$lt[1]);
    }

    private $lte(obj: CalculationTypes.Lte) {
        return this.interpret(obj.$lte[0]) > this.interpret(obj.$lte[1]);
    }

    private $and(obj: CalculationTypes.And) {
        return obj.$and.every((op) => !!this.interpret(op));
    }

    private $or(obj: CalculationTypes.Or) {
        return obj.$or.some((op) => !!this.interpret(op));
    }

    private $not(obj: CalculationTypes.Not) {
        return !this.interpret(obj.$not[0]);
    }

    private $includes(obj: CalculationTypes.Includes) {
        const result = this.interpret(obj.$includes[0]);
        if (typeof result === 'string' || result instanceof Array) {
            const search = this.interpret(obj.$includes[1]);
            return result.includes(search);
        }
        return false;
    }

    private resolveNumbers(first: number, second: number) {
        const [resolved1, resolved2] = [
            this.interpret(first),
            this.interpret(second),
        ];
        if (Number.isNaN(resolved1) || Number.isNaN(resolved2)) {
            return null;
        }
        return [resolved1, resolved2];
    }

    private $round(obj: CalculationTypes.Round) {
        const resolved = this.resolveNumbers(obj.$round[0], obj.$round[1]);
        if (!resolved) return resolved; // null
        const places = Math.floor(resolved[1]);
        return +(
            Math.round((resolved[0] + `e+${places}`) as unknown as number) +
            `e-${places}`
        );
    }

    private multiply(obj: CalculationTypes.Multiply) {
        const resolved = this.resolveNumbers(
            obj.$multiply[0],
            obj.$multiply[1]
        );
        if (!resolved) return resolved; // null
        return resolved[0] * resolved[1];
    }

    private $divide(obj: CalculationTypes.Divide) {
        const resolved = this.resolveNumbers(obj.$divide[0], obj.$divide[1]);
        if (!resolved) return resolved; // null
        return resolved[0] / resolved[1];
    }

    private $literal(obj: CalculationTypes.Literal) {
        return obj.$literal;
    }
}
