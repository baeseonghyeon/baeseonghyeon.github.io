export const touchRedirect = (url?: string, isBlank?: boolean) => {
    // if (!isBlank) isBlank = false;

    // if (isBlank) {
    window.open(url, "_blank");
    // } else {
    // window.location.href = url as string;
    // }
};
