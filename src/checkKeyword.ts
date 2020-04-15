export const checkKeyword = (
  keywords: string[],
  content: { title: string; body: string; comments: string[] }
): boolean => {
  return keywords.some((keyword) => {
    if (content.title.toLowerCase().includes(keyword.toLowerCase())) {
      return true;
    }
    if (content.body.toLowerCase().includes(keyword.toLowerCase())) {
      return true;
    }
    return content.comments.some((c) =>
      c.toLowerCase().includes(keyword.toLowerCase())
    );
  });
};
