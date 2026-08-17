import { describe, it, expect } from "vitest";
import { mapPostDto, mapPostListDto } from "./posts.mapper";

const validRawPost = {
  _id: "post-1",
  title: "Welcome",
  content: "First day of class",
  classId: "class-1",
  authorId: {
    _id: "user-1",
    name: "Teacher One",
    email: "teacher@example.com",
    role: "teacher",
    avatar: null,
  },
  isPinned: false,
  deletedAt: null,
  createdAt: "2026-08-17T00:00:00.000Z",
  updatedAt: "2026-08-17T00:00:00.000Z",
};

describe("mapPostDto", () => {
  it("maps a valid post with a populated authorId object", () => {
    const result = mapPostDto(validRawPost);
    expect(result).not.toBeNull();
    expect(result?.id).toBe("post-1");
    expect(result?.isPinned).toBe(false);
    expect(result?.authorId).toEqual({
      _id: "user-1",
      name: "Teacher One",
      email: "teacher@example.com",
      role: "teacher",
      avatar: null,
    });
  });

  it("returns null and does not throw for malformed input", () => {
    const result = mapPostDto({ title: "missing everything else" });
    expect(result).toBeNull();
  });
});

describe("mapPostListDto", () => {
  it("maps a list of valid posts", () => {
    const result = mapPostListDto([validRawPost, validRawPost]);
    expect(result).toHaveLength(2);
  });

  it("drops invalid entries instead of failing the whole list", () => {
    const result = mapPostListDto([validRawPost, { bogus: true }]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("post-1");
  });

  it("returns an empty array for non-array input", () => {
    // @ts-expect-error -- deliberately wrong input type, same guard mapClassListDto has
    const result = mapPostListDto(null);
    expect(result).toEqual([]);
  });
});
