import { z } from "zod";
import { ClassCard, JoinRequest } from "@/features/batches/types";

export const ClassDtoSchema = z
  .object({
    _id: z.string().optional(),
    id: z.string().optional(),
    name: z.string(),
    subject: z.string().optional().default(""),
    code: z.string(),
    studentCount: z.number().optional().default(0),
    maxStudents: z.number().optional().default(0),
    lastActivity: z.string().nullable().optional(),
    unreadMessages: z.number().optional().default(0),
    attendanceRate: z.number().optional().default(0),
    nextDeadline: z.string().nullable().optional(),
    status: z.enum(["active", "archived"]).optional().default("active"),
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

export const mapClassDto = (item: unknown[]): ClassCard[]  => {
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
  const id = parsedItem._id || parsedItem.id;
  if (!id) {
    console.error("[mapper] ClassCard missing id field:", parsedItem);
    return null; // drop the card entirely
  }

  return {
    id,
    name: parsedItem.name,
    subject: parsedItem.subject,
    code: parsedItem.code ?? "",
    studentCount: parsedItem.studentCount ?? 0,
    maxStudents: parsedItem.maxStudents ?? 0,
    lastActivity: parsedItem.lastActivity ?? null,
    unreadMessages: parsedItem.unreadMessages ?? 0,
    attendanceRate: parsedItem.attendanceRate ?? 0,
    nextDeadline: parsedItem.nextDeadline ?? null,
    status: parsedItem.status ?? "active",
  };
};

export const mapClassListDto = (items: unknown[]): ClassCard[] => {
  if (!Array.isArray(items)) return [];
  return items
    .map(mapClassDto)
    .filter((item): item is ClassCard => item !== null);
};

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
    console.error("JoinRequest parse failed:", result.error.flatten());
    throw new Error("Invalid join request data received from server");
  }
  return result.data;
}
