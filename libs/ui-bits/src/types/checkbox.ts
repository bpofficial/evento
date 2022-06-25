export type CheckboxOption = { id: string; label: string };

export interface Checkbox<T extends CheckboxOption = CheckboxOption> {
    title: string;
    options: T[];
}
