import { checkKeyword } from "../src/checkKeyword";

describe("checkKeyword", () => {
  it("returns true if keyword is included in the comment", () => {
    const result = checkKeyword(["test"], "this is a test");
    expect(result).toBe(true);
  });

  it("returns false if keyword is not included in the comment", () => {
    const result = checkKeyword(["test"], "this is a");
    expect(result).toBe(false);
  });

  it("returns true if any keyword is included in the comment", () => {
    const result = checkKeyword(["other", "test"], "this is a test");
    expect(result).toBe(true);
  });
  it("returns false if no keyword is not included in the comment", () => {
    const result = checkKeyword(["test", "other"], "this is a");
    expect(result).toBe(false);
  });
});
