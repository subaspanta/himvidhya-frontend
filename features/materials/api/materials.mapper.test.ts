import { describe, it, expect } from "vitest";
import { mapMaterialDto, mapMaterialListDto } from "./materials.mapper";

const validRawMaterial = {
  _id: "material-1",
  classId: "class-1",
  title: "Lecture Notes",
  description: "Week 1 slides",
  fileName: "notes.pdf",
  mimeType: "application/pdf",
  size: 102400,
  uploadedBy: {
    _id: "teacher-1",
    name: "Teacher One",
    email: "teacher@example.com",
    role: "teacher",
    avatar: null,
  },
  createdAt: "2026-08-17T00:00:00.000Z",
  updatedAt: "2026-08-17T00:00:00.000Z",
};

describe("mapMaterialDto", () => {
  it("maps a valid material and never carries a storageKey", () => {
    const result = mapMaterialDto(validRawMaterial);
    expect(result).not.toBeNull();
    expect(result?.id).toBe("material-1");
    expect(result?.size).toBe(102400);
    expect(result).not.toHaveProperty("storageKey");
  });

  it("defaults a missing description to an empty string", () => {
    const withoutDescription: Record<string, unknown> = { ...validRawMaterial };
    delete withoutDescription.description;
    const result = mapMaterialDto(withoutDescription);
    expect(result?.description).toBe("");
  });

  it("returns null and does not throw for malformed input", () => {
    const result = mapMaterialDto({ title: "missing everything else" });
    expect(result).toBeNull();
  });
});

describe("mapMaterialListDto", () => {
  it("maps a list of valid materials", () => {
    const result = mapMaterialListDto([validRawMaterial, validRawMaterial]);
    expect(result).toHaveLength(2);
  });

  it("drops invalid entries instead of failing the whole list", () => {
    const result = mapMaterialListDto([validRawMaterial, { bogus: true }]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("material-1");
  });

  it("returns an empty array for non-array input", () => {
    // @ts-expect-error -- deliberately wrong input type, same guard other list mappers have
    const result = mapMaterialListDto(null);
    expect(result).toEqual([]);
  });
});
