import { atom, selector } from 'recoil';

export const textState = atom<string>({
    key: 'textState',
    default: '',
});

export const textSelectorState = selector({
    key: 'textSelectorState',
    get: ({ get }) => {
        const text = get(textState);
        const upperCaseText = text.toUpperCase();
        const prefixText = 'Prefix_' + text;

        return {
            upperCaseText,
            prefixText,
        };
    },
});
