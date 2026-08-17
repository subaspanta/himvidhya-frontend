import ClassFeedPage from "@/features/posts/pages/ClassFeedPage";

export default async function ClassFeedRoute({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId } = await params;
  return <ClassFeedPage classId={classId} />;
}
