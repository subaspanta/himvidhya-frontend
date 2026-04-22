// features/class/components/UpcomingDeadlines.tsx
import { Button } from "@/components/ui/button";

interface Deadline {
  title: string;
  daysLeft: number;
  dueDate: string;
}

interface Props {
  deadlines: Deadline[];
}

export default function UpcomingDeadlines({ deadlines }: Props) {
  return (
    <div className="border-b border-border bg-card/50">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-wide">
             Upcoming Deadlines
          </h2>
          <Button variant="ghost" size="sm" className="text-xs">
            + Add Deadline
          </Button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          {deadlines.map((d, i) => (
            <div
              key={i}
              className="shrink-0 w-72 bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4 snap-center"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{d.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Due: {d.dueDate}
                  </p>
                </div>
                <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded">
                  {d.daysLeft}d
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
