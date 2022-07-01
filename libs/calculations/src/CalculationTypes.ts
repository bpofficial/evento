// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CalculationTypes {
    export interface Cond {
        $cond: [any, any, any];
    }

    export interface Eq {
        $eq: [any, any];
    }

    export interface Ne {
        $ne: [any, any];
    }

    export interface Gte {
        $gte: [any, any];
    }

    export interface Gt {
        $gt: [any, any];
    }

    export interface Lt {
        $lt: [any, any];
    }

    export interface Lte {
        $lte: [any, any];
    }

    export interface Or {
        $or: any[];
    }

    export interface And {
        $and: any[];
    }

    export interface Not {
        $not: [any];
    }

    export interface Includes {
        $includes: [any, any];
    }

    export interface Round {
        $round: [any, any];
    }

    export interface Multiply {
        $multiply: [any, any];
    }

    export interface Divide {
        $divide: [any, any];
    }

    export interface Literal {
        $literal: any;
    }
}
