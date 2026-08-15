# Data Model

## Overview

This document defines the core data models for the HimVidhya application, including Users, Classes, Announcements, Deadlines, and Attendance tracking.

---

## Entities

### User

Represents a user in the system (students, teachers, and administrators).

| Field          | Type            | Constraints      | Description                                 |
| -------------- | --------------- | ---------------- | ------------------------------------------- |
| `id`           | String/ObjectId | Primary Key      | Unique identifier                           |
| `name`         | String          | Required         | User's full name                            |
| `email`        | String          | Required, Unique | User's email address                        |
| `passwordHash` | String          | Required         | Hashed password for authentication          |
| `role`         | Enum            | Required         | User role: `student`, `teacher`, or `admin` |

**Indexes:**

- `email` (unique)

---

### Class

Represents a classroom or course.

| Field        | Type                   | Constraints                  | Description                                     |
| ------------ | ---------------------- | ---------------------------- | ----------------------------------------------- |
| `id`         | String/ObjectId        | Primary Key                  | Unique identifier                               |
| `name`       | String                 | Required                     | Class name                                      |
| `teacherId`  | String/ObjectId        | Required, Foreign Key → User | Reference to the teacher who owns the class     |
| `joinCode`   | String                 | Required, Unique             | Code for students to join the class             |
| `studentIds` | Array[String/ObjectId] | Foreign Keys → User          | Array of student user IDs enrolled in the class |

**Relationships:**

- One-to-Many: One teacher can have multiple classes
- Many-to-Many: Multiple students can be enrolled in a class

**Indexes:**

- `joinCode` (unique)
- `teacherId`

---

### Announcement

Represents a class announcement posted by a teacher.

| Field       | Type            | Constraints                   | Description                                           |
| ----------- | --------------- | ----------------------------- | ----------------------------------------------------- |
| `id`        | String/ObjectId | Primary Key                   | Unique identifier                                     |
| `classId`   | String/ObjectId | Required, Foreign Key → Class | Reference to the class                                |
| `teacherId` | String/ObjectId | Required, Foreign Key → User  | Reference to the teacher who created the announcement |
| `title`     | String          | Required                      | Announcement title                                    |
| `content`   | String          | Required                      | Announcement content/body                             |
| `createdAt` | DateTime        | Required, Auto-generated      | Timestamp of creation                                 |

**Relationships:**

- Many-to-One: Multiple announcements belong to one class
- Many-to-One: Multiple announcements are created by one teacher

**Indexes:**

- `classId`
- `createdAt` (descending)

---

### Deadline

Represents an assignment or task deadline for a class.

| Field         | Type            | Constraints                   | Description                                     |
| ------------- | --------------- | ----------------------------- | ----------------------------------------------- |
| `id`          | String/ObjectId | Primary Key                   | Unique identifier                               |
| `classId`     | String/ObjectId | Required, Foreign Key → Class | Reference to the class                          |
| `title`       | String          | Required                      | Deadline title/name                             |
| `description` | String          | Optional                      | Detailed description of the deadline/assignment |
| `dueAt`       | DateTime        | Required                      | Due date and time                               |

**Relationships:**

- Many-to-One: Multiple deadlines belong to one class

**Indexes:**

- `classId`
- `dueAt`

---

### AttendanceSession

Represents an attendance tracking session for a class.

| Field     | Type            | Constraints                   | Description                    |
| --------- | --------------- | ----------------------------- | ------------------------------ |
| `id`      | String/ObjectId | Primary Key                   | Unique identifier              |
| `classId` | String/ObjectId | Required, Foreign Key → Class | Reference to the class         |
| `date`    | Date            | Required                      | Date of the attendance session |
| `records` | Array[Object]   | Required                      | Array of attendance records    |

**Attendance Record Structure:**

```javascript
{
  studentId: String/ObjectId,  // Foreign Key → User
  status: Enum                 // Values: "present", "absent", "late", "excused"
}
```

**Relationships:**

- Many-to-One: Multiple attendance sessions belong to one class
- Each record references a student

**Indexes:**

- `classId`
- `date`
- Compound: `(classId, date)` (unique)

---

## Entity Relationship Diagram

```
User (1) ──────────┐
  │                │
  │ teacher        │ student
  │                │
  ▼                ▼
Class (M) ────── (M) User
  │
  │
  ├─────────► Announcement (M)
  │
  ├─────────► Deadline (M)
  │
  └─────────► AttendanceSession (M)
```

---

## Notes

- All IDs are typically implemented as ObjectId (MongoDB) or UUID (PostgreSQL)
- Timestamps should be stored in UTC
- Soft delete strategy should be considered for important entities
- Consider adding `createdAt` and `updatedAt` fields to all entities for audit purposes
