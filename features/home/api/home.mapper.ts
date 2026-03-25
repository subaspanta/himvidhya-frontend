import { z } from "zod";
import { ClassCard } from "@/features/batches/types";

export const ClassDtoSchema = z
  .object({
    _id: z.string().optional(),
    id: z.string().optional(),
    name: z.string(),
    subject: z.string(),
    code: z.string().optional(),
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

export const mapClassDto = (item: unknown): ClassCard => {
  const result = ClassDtoSchema.safeParse(item);
  const parsedItem: Partial<ClassDto> = result.success ? result.data : {};

  const id = parsedItem._id || parsedItem.id || "";

  return {
    id,
    name: parsedItem.name ?? "",
    subject: parsedItem.subject ?? "",
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
  return Array.isArray(items) ? items.map(mapClassDto) : [];
};
