import { describe, expect, it } from "vitest";
import { extractYoutubeThumbnail } from "@/features/posts/constants";

describe("extractYoutubeThumbnail", () => {
  it.each([
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://youtu.be/dQw4w9WgXcQ",
    "https://youtube.com/embed/dQw4w9WgXcQ",
    "https://m.youtube.com/shorts/dQw4w9WgXcQ",
  ])("extracts supported YouTube URLs: %s", (url) => {
    expect(extractYoutubeThumbnail(url)).toBe(
      "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    );
  });

  it.each([
    "https://example.com/youtube.com/watch?v=dQw4w9WgXcQ",
    "javascript:alert(1)",
    "https://youtube.com/watch?v=too-short",
  ])("rejects lookalike or unsafe URLs: %s", (url) => {
    expect(extractYoutubeThumbnail(url)).toBeNull();
  });
});
