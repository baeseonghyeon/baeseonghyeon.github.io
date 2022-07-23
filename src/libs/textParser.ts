export const firsttLetterCapitalizer = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const lowerCaseParser = (text: string | undefined) => {
    if (text) return text.toLowerCase().replaceAll(" ", "-");
};
