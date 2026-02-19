// features/class/components/ChannelTabs.tsx
interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "announcements", label: "Announcements" },
  { id: "assignments", label: "Assignments" },
  { id: "materials", label: "Materials" },
  { id: "chat", label: "General Chat" },
  { id: "attendance", label: "Attendance" },
  { id: "qa", label: "Q&A" },
];

export default function ChannelTabs({ activeTab, onTabChange }: Props) {
  return (
    <div className="border-b border-border bg-card sticky top-16 z-40">
      <div className="container mx-auto px-6">
        <div className="flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-2 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
