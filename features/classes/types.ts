/**
 * Class/Course Types
 */

export interface ClassCard {
  _id: string;
  name: string;
  subject: string;
  code: string;
  creator: {
    _id: string;
    name: string;
    email: string;
    avatar: string | null;
    username: string;
  };
  members: Array<{
    user: string;
    role: "teacher" | "student";
    joinedAt: string;
  }>;
  createdAt: string;
}

export interface ClassDetails extends ClassCard {
  createdAt: string;
  updatedAt: string;
  members: ClassMember[];
  announcements: Announcement[];
}

export interface ClassMember {
  user: string;
  id: string;
  name: string;
  email: string;
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
