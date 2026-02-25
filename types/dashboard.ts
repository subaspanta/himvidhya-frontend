export interface Batch {
  id: string;
  name: string;
  subject: string;
  code: string;
  studentCount: number;
  lastActivity: string; // e.g., "2h ago" or "Just now"
  unreadMessages: number;
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
