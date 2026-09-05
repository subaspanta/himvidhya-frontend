/**
 * Class/Batch Types — matches API response shapes exactly
 */

// Returned by GET /classes and all class mutation endpoints
export interface ClassCard {
  id: string;
  name: string;
  subject: string;
  description?: string;
  college?: string;
  semester?: string;
  code: string;
  studentCount: number;
  lastActivity: string | null;
  status: "active" | "archived";
  createdAt: string;
  owner: {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar: string | null;
  };
}

// GET /classes/:id — card DTO plus members count (roster at separate endpoint)
export interface ClassDetails extends ClassCard {
  membersCount: number;
}

// Student-only members (owner excluded, available via ClassDetails.owner)
export interface ClassMember {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar: string | null;
  };
  joinedAt: string;
}

// Raw join request response (class/user as unpopulated ids)
export interface JoinRequest {
  _id: string;
  class: string;
  user: string;
  type: "request" | "invite";
  status: "pending" | "approved" | "rejected";
  rejectionCount: number;
  createdAt: string;
}

// Teacher-facing queue (class and user populated)
export interface TeacherJoinRequest {
  _id: string;
  class: {
    _id: string;
    name: string;
    subject: string;
  };
  user: {
    _id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
  type: "request" | "invite";
  status: "pending" | "approved" | "rejected";
  rejectionCount: number;
  createdAt: string;
}
