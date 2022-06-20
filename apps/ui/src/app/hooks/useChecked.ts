import { useState } from 'react';

export type CheckedOption = { key: string; value: boolean };

export const useChecked = (
    onEdit: (id: string) => void,
    initial?: CheckedOption
) => {
    const [checked, setEdit] = useState<CheckedOption | undefined>(initial);

    const onChange = (key: string) => (value: boolean) => {
        setEdit({ key, value });
        onEdit(key);
    };

    return { checked, onChange };
};
