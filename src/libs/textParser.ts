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

// Its deprecated, but we keep it for backward compatibility
export const googleCloudImageUrl = (imageId: string) => {
    let imageUrlArray = imageId.split("/");

    if (imageUrlArray[0] === "https:") {
        imageId = imageUrlArray[5];
    }

    return "https://drive.google.com/uc?export=view&id=" + imageId;
};

export const convertImgurUrlToDirectLink = (
    url: string,
    extension: string = "png",
): string => {
    const regex =
        /^https?:\/\/(?:www\.)?imgur\.com\/(?:gallery\/|a\/)?([a-zA-Z0-9]+)$/;
    const match = url.match(regex);
    if (match && match[1]) {
        const imageId = match[1];
        return `https://i.imgur.com/${imageId}.${extension}`;
    }
    return url;
};
