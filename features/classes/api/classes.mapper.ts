import { z } from "zod";
import {
  ClassCard,
  ClassDetails,
  ClassMember,
  JoinRequest,
  TeacherJoinRequest,
} from "@/features/classes/types";

const ClassOwnerDtoSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  avatar: z.string().nullable(),
});

export const ClassDtoSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    subject: z.string().optional().default(""),
    description: z.string().optional(),
    college: z.string().optional(),
    semester: z.string().optional(),
    code: z.string(),
    studentCount: z.number(),
    lastActivity: z.string().nullable(),
    status: z.enum(["active", "archived"]),
    createdAt: z.string(),
    owner: ClassOwnerDtoSchema,
  })
  .passthrough();

export type ClassDto = z.infer<typeof ClassDtoSchema>;

type MapResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

const isDev = process.env.NODE_ENV !== "production";

function safeMap<T>(
  schema: z.ZodSchema<T>,
  raw: unknown,
  label: string,
): MapResult<T> {
  const result = schema.safeParse(raw);

  if (result.success) {
    return { success: true, data: result.data };
  }

  console.error(`[mapper] ${label} parse failed:`, result.error.flatten());

  return {
    success: false,
    error: `Invalid ${label} data received from server`,
  };
}

export const mapClassDto = (item: unknown): ClassCard | null => {
  const mapped = safeMap(ClassDtoSchema, item, "class");

  if (!mapped.success) {
    if (isDev) {
      console.warn(
        "[mapper] Dropping invalid class card in dev:",
        mapped.error,
      );
    }
    return null;
  }

  const parsedItem = mapped.data;

  return {
    id: parsedItem.id,
    name: parsedItem.name,
    subject: parsedItem.subject ?? "",
    description: parsedItem.description,
    college: parsedItem.college,
    semester: parsedItem.semester,
    code: parsedItem.code,
    studentCount: parsedItem.studentCount,
    lastActivity: parsedItem.lastActivity,
    status: parsedItem.status,
    createdAt: parsedItem.createdAt,
    owner: parsedItem.owner,
  };
};
export const mapClassListDto = (items: unknown[]): ClassCard[] => {
  if (!Array.isArray(items)) return [];

  const results = items.map(mapClassDto);
  const valid = results.filter((item): item is ClassCard => item !== null);

  if (isDev && valid.length !== items.length) {
    console.warn(
      `[mapper] ${items.length - valid.length} class(es) failed to parse and were dropped`,
    );
  }

  return valid;
};

const ClassDetailsDtoSchema = ClassDtoSchema.extend({
  membersCount: z.number(),
});

// A class detail is a single, critical response (the whole page depends on
// it), so this follows mapJoinRequest's throwing policy rather than
// mapClassDto's drop-invalid-and-continue one.
export function mapClassDetails(raw: unknown): ClassDetails {
  const result = ClassDetailsDtoSchema.safeParse(raw);
  if (!result.success) {
    console.error(
      "[mapper] ClassDetails parse failed:",
      result.error.flatten(),
    );
    throw new Error("Invalid class details data received from server");
  }

  const parsed = result.data;

  return {
    id: parsed.id,
    name: parsed.name,
    subject: parsed.subject ?? "",
    description: parsed.description,
    college: parsed.college,
    semester: parsed.semester,
    code: parsed.code,
    studentCount: parsed.studentCount,
    lastActivity: parsed.lastActivity,
    status: parsed.status,
    createdAt: parsed.createdAt,
    owner: parsed.owner,
    membersCount: parsed.membersCount,
  };
}

const JoinRequestSchema = z.object({
  _id: z.string(),
  class: z.string(),
  user: z.string(),
  type: z.enum(["request", "invite"]),
  status: z.enum(["pending", "approved", "rejected"]),
  rejectionCount: z.number().default(0),
  createdAt: z.string(),
});

export function mapJoinRequest(raw: unknown): JoinRequest {
  const result = JoinRequestSchema.safeParse(raw);
  if (!result.success) {
    console.error("[mapper] JoinRequest parse failed:", result.error.flatten());
    throw new Error("Invalid join request data received from server");
  }
  return result.data;
}

const TeacherJoinRequestSchema = z.object({
  _id: z.string(),
  class: z.object({
    _id: z.string(),
    name: z.string(),
    subject: z.string(),
  }),
  user: z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
    avatar: z.string().nullable(),
  }),
  type: z.enum(["request", "invite"]),
  status: z.enum(["pending", "approved", "rejected"]),
  rejectionCount: z.number().default(0),
  createdAt: z.string(),
});

// The teacher's join-request sidebar queue is a small, secondary list --
// one malformed row (e.g. referencing a class deleted out-of-band)
// shouldn't blank the whole widget, so this follows mapClassDto's
// drop-invalid-and-continue policy rather than mapJoinRequest's throwing
// one above.
export function mapTeacherJoinRequest(raw: unknown): TeacherJoinRequest | null {
  const result = TeacherJoinRequestSchema.safeParse(raw);
  if (!result.success) {
    if (isDev) {
      console.warn(
        "[mapper] Dropping invalid teacher join request:",
        result.error.flatten(),
      );
    }
    return null;
  }
  return result.data;
}

export function mapTeacherJoinRequestsList(
  items: unknown[],
): TeacherJoinRequest[] {
  if (!Array.isArray(items)) return [];

  const results = items.map(mapTeacherJoinRequest);
  return results.filter(
    (item): item is TeacherJoinRequest => item !== null,
  );
}

const ClassMemberSchema = z.object({
  user: z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
    avatar: z.string().nullable(),
  }),
  joinedAt: z.string(),
});

// A roster silently missing students is worse than a visible error, so
// this follows mapJoinRequest's throwing policy rather than mapClassDto's
// drop-invalid-and-continue one.
export function mapClassMember(raw: unknown): ClassMember {
  const result = ClassMemberSchema.safeParse(raw);
  if (!result.success) {
    console.error(
      "[mapper] ClassMember parse failed:",
      result.error.flatten(),
    );
    throw new Error("Invalid class member data received from server");
  }
  return result.data;
}

export function mapClassMembersList(items: unknown[]): ClassMember[] {
  if (!Array.isArray(items)) {
    throw new Error("Invalid class members list received from server");
  }
  return items.map(mapClassMember);
}
