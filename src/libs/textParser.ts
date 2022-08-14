export const firsttLetterCapitalizer = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const lowerCaseParser = (text: string | undefined) => {
    let reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

    if (text) {
        text = text.replace(reg, "") as string;
        return text.toLowerCase().replace(/ /g, "-") as string;
    }
};

export const googleCloudImageUrl = (imageId: string) => {
    return "https://drive.google.com/uc?export=view&id=" + imageId;
};
