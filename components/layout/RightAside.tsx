"use client";

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RightAside() {
  return (
    <aside className="w-full lg:w-[300px] shrink-0 flex flex-col gap-8 lg:sticky lg:top-8 lg:self-start">
      {/* Upcoming Classes Widget */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-base text-foreground">
            Upcoming Classes
          </h3>
          <a
            href="#"
            className="text-sm font-medium text-primary hover:underline cursor-pointer"
          >
            View Calendar
          </a>
        </div>

        <div className="flex flex-col">
          {[
            {
              title: "Advanced React & TS",
              subtitle: "Performance Optimization",
              time: "10:00 AM",
            },
            {
              title: "UI Design Patterns",
              subtitle: "Micro-Interactions",
              time: "02:30 PM",
            },
            {
              title: "Fullstack Systems",
              subtitle: "Database Sharding",
              time: "04:00 PM",
            },
          ].map((cls, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 py-3 border-b border-border last:border-0"
            >
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {cls.title}
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {cls.subtitle}
                </p>
              </div>
              <span className="text-xs font-medium text-primary mt-0.5 shrink-0">
                {cls.time}
              </span>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 px-4 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors">
          Show Full Schedule
        </button>
      </section>

      {/* Join Requests Widget */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-base text-foreground">
            Join Requests
          </h3>
          <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full shrink-0">
            2 New
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {[
            {
              name: "Sarah Jenkins",
              batch: "UI Design Patterns",
              initial: "S",
              avatarUrl: undefined,
            },
            {
              name: "Marcus Chen",
              batch: "Advanced React & TS",
              initial: "M",
              avatarUrl: undefined,
            },
          ].map((req, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg border border-border"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="w-9 h-9 shrink-0">
                  {req.avatarUrl ? (
                    <AvatarImage src={req.avatarUrl} alt={req.name} />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-foreground font-medium text-sm">
                      {req.initial}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {req.name}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {req.batch}
                  </p>
                </div>
              </div>
              <div className="flex gap-1.5 shrink-0 ml-2">
                <button className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                  <XCircle className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-md text-primary bg-primary/10 hover:bg-primary/20 transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-2 px-4 rounded-md bg-muted/50 text-foreground text-sm font-medium hover:bg-muted transition-colors">
          Review All Requests
        </button>
      </section>
    </aside>
  );
}
