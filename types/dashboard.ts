export interface Batch {
  id: string;
  name: string;
  subject: string;
  code: string;
  studentCount: number;
  maxStudents: number;
  lastActivity: string; // e.g., "2h ago" or "Yesterday"
  unreadMessages: number;
  attendanceRate: number; // percentage 0-100
  nextDeadline?: string; // ISO date string
  status: "active" | "archived";
}

export interface TeacherStats {
  totalStudents: number;
  activeBatches: number;
  averageAttendance: number; // percentage
  assignmentsPending: number;
  joinRequests: number;
}

export interface TeacherProfile {
  name: string;
  id: string;
  avatarUrl?: string; // Optional URL
}
