// features/class/components/ClassHeader.tsx
import { ArrowLeft, Copy, Bell, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ClassDetails } from "../../types";

interface Props {
  classData: ClassDetails;
}

export default function ClassHeader({ classData }: Props) {
  const router = useRouter();

  const copyCode = () => {
    if (classData.joinCode) {
      navigator.clipboard.writeText(classData.joinCode);
      // TODO: toast "Code copied!"
    }
  };

  return (
    <div className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/home")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold">{classData.name}</h1>
              <p className="text-xs text-muted-foreground">
                {classData.creator.name} • {classData.subject}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {classData.joinCode && (
              <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md">
                <code className="text-sm font-mono font-bold">
                  {classData.joinCode}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                  onClick={copyCode}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            )}
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
