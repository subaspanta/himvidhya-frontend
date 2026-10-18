import { describe, expect, it } from "vitest";
import {
  mapMaterialDto,
  mapMaterialListDto,
} from "@/features/materials/api/materials.mapper";

const rawMaterial = {
  _id: "material-1",
  title: "Week one notes",
  description: "Read before class",
  fileName: "week-one.pdf",
  mimeType: "application/pdf",
  size: 2048,
  classId: "class-1",
  uploadedBy: {
    _id: "teacher-1",
    name: "Teacher One",
    email: "teacher@example.com",
    role: "teacher",
    avatar: null,
  },
  createdAt: "2026-10-17T00:00:00.000Z",
  updatedAt: "2026-10-17T00:00:00.000Z",
};

describe("materials mapper", () => {
  it("normalizes the Mongo id and keeps populated uploader metadata", () => {
    expect(mapMaterialDto(rawMaterial)).toEqual({
      id: "material-1",
      title: "Week one notes",
      description: "Read before class",
      fileName: "week-one.pdf",
      mimeType: "application/pdf",
      size: 2048,
      classId: "class-1",
      uploadedBy: rawMaterial.uploadedBy,
      createdAt: rawMaterial.createdAt,
      updatedAt: rawMaterial.updatedAt,
    });
  });

  it("defaults a missing description and drops malformed rows", () => {
    const withoutDescription = { ...rawMaterial, description: undefined };
    const result = mapMaterialListDto([withoutDescription, { invalid: true }]);

    expect(result).toHaveLength(1);
    expect(result[0].description).toBe("");
  });
});
