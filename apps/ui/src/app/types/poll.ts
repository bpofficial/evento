import { Checkbox, CheckboxOption } from './checkbox';

export interface PollOption extends CheckboxOption {
    count: number;
}

export type Poll = Checkbox<PollOption>;
