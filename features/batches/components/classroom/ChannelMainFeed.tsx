// features/class/components/ClassMainFeed.tsx
import { ClassDetails } from "../../types";
import AnnouncementCard from "./AnnouncementCard";

interface Props {
  activeTab: string;
  classData: ClassDetails;
}

export default function ClassMainFeed({ activeTab, classData }: Props) {
  if (activeTab === "announcements") {
    return (
      <div className="space-y-4">
        {Array.isArray(classData.announcements) &&
        classData.announcements.length > 0 ? (
          classData.announcements.map((ann) => (
            <AnnouncementCard key={ann.id || (ann as any)._id} announcement={ann} />
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No announcements yet
          </div>
        )}
      </div>
    );
  }

  // Placeholder for other tabs
  return (
    <div className="bg-card border border-border rounded-lg p-8 text-center">
      <p className="text-muted-foreground">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming
        soon
      </p>
    </div>
  );
}
