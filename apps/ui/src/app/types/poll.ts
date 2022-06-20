import { Vote, VoteOption } from './vote';

export interface PollOption extends VoteOption {
    count: number;
}

export type Poll = Vote<PollOption>;
