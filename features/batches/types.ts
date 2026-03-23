/**
 * Class/Batch Types — matches API response shapes exactly
 */

// Shape returned by GET /class/my
export interface ClassCard {
  id: string;
  name: string;
  subject: string;
  code: string;
  studentCount: number;
  maxStudents: number;
  lastActivity: string | null;
  unreadMessages: number;
  attendanceRate: number;
  nextDeadline: string | null;
  status: "active" | "archived";
  creator?: {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar: string | null;
  };
  members?: ClassMember[];
}

// Shape returned by GET /class/:id
export interface ClassDetails {
  _id: string;
  name: string;
  subject: string;
  description?: string;
  joinCode: string;
  status: "active" | "archived";
  creator: {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar: string | null;
  };
  members: ClassMember[];
  membersCount: number;
  maxStudents: number;
  attendanceRate: number;
  nextDeadline: string | null;
  announcements?: Announcement[];
  createdAt: string;
  updatedAt: string;
}

export interface ClassMember {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar: string | null;
  };
  role: "teacher" | "student";
  joinedAt: string;
}

// Shape returned by POST /class/join (now returns joinRequest not class)
export interface JoinRequest {
  _id: string;
  class: string;
  user: string;
  type: "request" | "invite";
  status: "pending" | "approved" | "rejected";
  rejectionCount: number;
  createdAt: string;
}

export interface Announcement {
  id: string; // Used by UI
  _id?: string;
  title: string;
  content: string;
  author: {
    _id?: string;
    id?: string;
    name: string;
    role: string;
  };
  createdAt: string;
}
