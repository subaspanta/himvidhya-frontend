// Material types — matches API response shapes exactly (Material.model.js).
// storageKey is never present in any response (ADR-0005) and is
// deliberately absent from this type.

export interface MaterialUploader {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

export interface Material {
  id: string;
  classId: string;
  title: string;
  description: string;
  fileName: string;
  mimeType: string;
  size: number;
  uploadedBy: MaterialUploader;
  createdAt: string;
  updatedAt: string;
}

export interface MaterialsPage {
  materials: Material[];
  meta: {
    nextCursor: string | null;
    hasMore: boolean;
  };
}
