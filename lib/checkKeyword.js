export const checkKeyword = (keywords, comment) => {
    return keywords.some((keyword) => {
        return comment.toLowerCase().includes(keyword.toLowerCase());
    });
};
