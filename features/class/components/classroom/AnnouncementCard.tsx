import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

// features/class/components/AnnouncementCard.tsx
interface Announcement {
  _id: string;
  content: string;
  createdAt: string;
  author: { name: string; role: string };
}

interface Props {
  announcement: Announcement;
}

export default function AnnouncementCard({ announcement }: Props) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {announcement.author.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-sm">
              {announcement.author.name}
              {announcement.author.role === "teacher" && (
                <span className="ml-2 px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-md font-mono">
                  Teacher
                </span>
              )}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(announcement.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-foreground leading-relaxed">{announcement.content}</p>
    </div>
  );
}
