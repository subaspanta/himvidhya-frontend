/**
 * Class/Batch Types — matches API response shapes exactly
 */

// Shape returned by every class-returning endpoint: GET /classes and all
// five class-mutation endpoints (create/update/archive/restore/regenerate
// join code) — the server returns this same card DTO from all of them.
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

// Shape returned by GET /classes/:id — the card DTO plus membersCount. The
// roster itself lives at GET /classes/:classId/members (item 13); this
// response carries only the count, not the full member list.
export interface ClassDetails extends ClassCard {
  membersCount: number;
}

// ClassMember is student-only — the class owner is never a member row
// (ownership is read from ClassDetails.owner / ClassCard.owner).
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

// Shape returned by POST /classes/join and the approve/reject mutations —
// class/user are unpopulated ids in all three of those responses.
export interface JoinRequest {
  _id: string;
  class: string;
  user: string;
  type: "request" | "invite";
  status: "pending" | "approved" | "rejected";
  rejectionCount: number;
  createdAt: string;
}

// Shape returned by GET /classes/requests — the teacher-facing queue, with
// class and user populated (unlike JoinRequest above).
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
