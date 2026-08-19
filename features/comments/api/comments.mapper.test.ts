import { describe, it, expect } from "vitest";
import { mapCommentDto, mapCommentListDto } from "./comments.mapper";

const validRawComment = {
  _id: "comment-1",
  postId: "post-1",
  content: "Great post!",
  authorId: {
    _id: "user-1",
    name: "Student One",
    email: "student@example.com",
    role: "student",
    avatar: null,
  },
  deletedAt: null,
  createdAt: "2026-08-17T00:00:00.000Z",
  updatedAt: "2026-08-17T00:00:00.000Z",
};

describe("mapCommentDto", () => {
  it("maps a valid comment with a populated authorId object", () => {
    const result = mapCommentDto(validRawComment);
    expect(result).not.toBeNull();
    expect(result?.id).toBe("comment-1");
    expect(result?.postId).toBe("post-1");
    expect(result?.authorId).toEqual({
      _id: "user-1",
      name: "Student One",
      email: "student@example.com",
      role: "student",
      avatar: null,
    });
  });

  it("returns null and does not throw for malformed input", () => {
    const result = mapCommentDto({ content: "missing everything else" });
    expect(result).toBeNull();
  });
});

describe("mapCommentListDto", () => {
  it("maps a list of valid comments", () => {
    const result = mapCommentListDto([validRawComment, validRawComment]);
    expect(result).toHaveLength(2);
  });

  it("drops invalid entries instead of failing the whole list", () => {
    const result = mapCommentListDto([validRawComment, { bogus: true }]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("comment-1");
  });

  it("returns an empty array for non-array input", () => {
    // @ts-expect-error -- deliberately wrong input type, same guard other list mappers have
    const result = mapCommentListDto(null);
    expect(result).toEqual([]);
  });
});
