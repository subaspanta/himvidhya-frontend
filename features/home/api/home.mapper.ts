import { z } from "zod";
import { ClassCard, JoinRequest } from "@/features/batches/types";

const ClassOwnerDtoSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  avatar: z.string().nullable(),
});

export const ClassDtoSchema = z
  .object({
    _id: z.string().optional(),
    id: z.string().optional(),
    name: z.string(),
    subject: z.string().optional().default(""),
    description: z.string().optional(),
    college: z.string().optional(),
    semester: z.string().optional(),
    code: z.string().optional().default(""),
    studentCount: z.number().optional().default(0),
    lastActivity: z.string().nullable().optional(),
    unreadMessages: z.number().optional().default(0),
    status: z.enum(["active", "archived"]).optional().default("active"),
    owner: ClassOwnerDtoSchema.optional(),
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

  const id = parsedItem._id || parsedItem.id;
  if (!id) {
    console.error("[mapper] ClassCard missing id field:", parsedItem);
    return null;
  }

  return {
    id,
    name: parsedItem.name,
    subject: parsedItem.subject ?? "",
    description: parsedItem.description,
    college: parsedItem.college,
    semester: parsedItem.semester,
    code: parsedItem.code ?? "",
    studentCount: parsedItem.studentCount ?? 0,
    lastActivity: parsedItem.lastActivity ?? null,
    unreadMessages: parsedItem.unreadMessages ?? 0,
    status: parsedItem.status ?? "active",
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
