export interface Vote<T = any> {
    title: string;
    options: T[];
}

export interface SimpleVoteProps {
    option: Vote;
}

export const SimpleVote = () => {
    return <></>;
};
