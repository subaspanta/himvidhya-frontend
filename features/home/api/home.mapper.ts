import { z } from "zod";
import { ClassCard } from "@/features/batches/types";

export const ClassDtoSchema = z.object({
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
}).passthrough();

export type ClassDto = z.infer<typeof ClassDtoSchema>;

export const mapClassDto = (item: unknown): ClassCard => {
  const result = ClassDtoSchema.safeParse(item);
  const parsedItem = (result.success ? result.data : item) as Record<string, unknown>;

  return {
    ...parsedItem,
    id: (parsedItem._id as string) || (parsedItem.id as string) || "",
    _id: (parsedItem._id as string) || (parsedItem.id as string) || "",
  } as unknown as ClassCard; // Type assertion because of spread and missing guaranteed fields in input
};

export const mapClassListDto = (items: unknown[]): ClassCard[] => {
  return Array.isArray(items) ? items.map(mapClassDto) : [];
};
