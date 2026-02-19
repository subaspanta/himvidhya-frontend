/**
 * Class/Course Types
 */

export interface ClassCard {
  _id: string;
  name: string;
  subject: string;
  code: string;
  description?: string;
  creator: {
    _id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
  members: Array<{
    user: string;
    role: "teacher" | "student";
    joinedAt: string;
  }>;
  createdAt: string;
}

export interface ClassDetails extends Omit<ClassCard, "members" | "creator"> {
  _id: string;
  name: string;
  subject: string;
  description?: string;
  joinCode: string;
  creator: {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar: string | null;
  };
  members: ClassMember[];
  announcements?: Announcement;
  membersCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClassMember {
  user: {
    id: string;
    name: string;
    email: string;
  };
  role: "teacher" | "student";
  joinedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}
