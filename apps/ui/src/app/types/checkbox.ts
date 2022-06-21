export type CheckboxOption = { id: string; label: string };

export interface Checkbox<T extends CheckboxOption = CheckboxOption> {
    title: string;
    options: T[];
}

export interface ClaimableVoteOption extends CheckboxOption {
    completed?: {
        completedBy: string;
        completedAt: string;
        anonymous: boolean;
    } | null;
    completionText?: string;
}
