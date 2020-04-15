import { checkKeyword } from "../src/checkKeyword";

describe("checkKeyword", () => {
  it("returns true if keyword is included in the title", () => {
    const result = checkKeyword(["test"], {
      title: "test",
      body: "",
      comments: [],
    });
    expect(result).toBe(true);
  });
  it("returns true if keyword is included in the body", () => {
    const result = checkKeyword(["test"], {
      title: "",
      body: "test",
      comments: [],
    });
    expect(result).toBe(true);
  });
  it("returns true if second keyword is included in title or body", () => {
    const result = checkKeyword(["test", "bar"], {
      title: "bar",
      body: "",
      comments: [],
    });
    expect(result).toBe(true);
  });
  it("returns true for different casings in keyword", () => {
    const result = checkKeyword(["test", "Bar"], {
      title: "bar",
      body: "",
      comments: [],
    });
    expect(result).toBe(true);
  });
  it("returns true for different casings in content", () => {
    const result = checkKeyword(["test", "bar"], {
      title: "Bar",
      body: "",
      comments: [],
    });
    expect(result).toBe(true);
  });

  it("returns false if keyword is not included in title or body", () => {
    const result = checkKeyword(["test"], {
      title: "",
      body: "",
      comments: [],
    });
    expect(result).toBe(false);
  });

  it("returns true if keyword is included in the comments", () => {
    const result = checkKeyword(["test"], {
      title: "",
      body: "",
      comments: ["other", "Test"],
    });
    expect(result).toBe(true);
  });
});
