export interface MaterialUploader {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  fileName: string;
  mimeType: string;
  size: number;
  classId: string;
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
