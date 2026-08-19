import { ClassLayoutShell } from "@/features/classes/components/ClassLayoutShell";

export default async function ClassLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return <ClassLayoutShell classId={classId}>{children}</ClassLayoutShell>;
}
