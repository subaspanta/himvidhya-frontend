// features/class/components/ClassSidebar.tsx
import { Button } from "@/components/ui/button";
import { Calendar, FileText, UserPlus } from "lucide-react";
import { ClassDetails } from "../../types";

interface Props {
  classData: ClassDetails;
}

export default function ClassSidebar({ classData }: Props) {
  return (
    <div className="space-y-6">
      {/* Members */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Class Members</h3>
        <p className="text-2xl font-bold text-primary">
          {classData.membersCount}
        </p>
        <p className="text-xs text-muted-foreground">students enrolled</p>
        {/* Avatar group + View List button */}
      </div>

      {/* Quick Links */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Calendar className="w-4 h-4 mr-3" /> Class Calendar
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="w-4 h-4 mr-3" /> Syllabus & Policies
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <UserPlus className="w-4 h-4 mr-3" /> Invite Assistants
          </Button>
        </div>
      </div>

      {/* Class Info */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Class Info</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-muted-foreground">Subject</p>
            <p className="font-medium">{classData.subject}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Instructor</p>
            <p className="font-medium">{classData.owner.name}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Created</p>
            <p className="font-medium">
              {new Date(classData.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
