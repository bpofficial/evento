import { CanGoNext } from '../types';

export interface Vote<T = any> {
    title: string;
    options: T[];
}

export interface SimpleVoteProps extends CanGoNext {
    option: Vote;
}

export const SimpleVote = ({ option, onCanGoNext }: SimpleVoteProps) => {
    return <></>;
};
