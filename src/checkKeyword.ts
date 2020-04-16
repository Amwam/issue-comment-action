export const checkKeyword = (keywords: string[], comment: string): boolean => {
  return keywords.some((keyword) => {
    comment.toLowerCase().includes(keyword.toLowerCase());
  });
};
