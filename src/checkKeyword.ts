export const checkKeyword = (keywords: string[], comment: string): boolean => {
  return keywords.some((keyword) => {
    return comment.toLowerCase().includes(keyword.toLowerCase());
  });
};
