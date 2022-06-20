export type VoteOption = { id: string; name: string };

export interface Vote<T extends VoteOption = VoteOption> {
    title: string;
    options: T[];
}

export interface ClaimableVoteOption extends VoteOption {
    completed?: {
        completedBy: string;
        completedAt: string;
        anonymous: boolean;
    } | null;
    completionText?: string;
}
