"use client";

import React from "react";
import { Clock, CheckCircle2, LogIn } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RightAside() {
  return (
    <aside className="w-full flex-none lg:w-[360px] flex flex-col gap-8">
      {/* Upcoming Classes Widget */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-foreground">
            Upcoming Classes
          </h3>
          <a
            href="#"
            className="text-sm font-medium text-primary hover:underline cursor-pointer"
          >
            View Calendar
          </a>
        </div>

        <div className="flex flex-col gap-4">
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
            <div key={idx} className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-full text-primary mt-1">
                <Clock className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">
                  {cls.title}
                </h4>
                <p className="text-xs text-muted-foreground">{cls.subtitle}</p>
              </div>
              <span className="text-xs font-semibold text-primary mt-1">
                {cls.time}
              </span>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 py-2 px-4 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors">
          Show Full Schedule
        </button>
      </section>

      {/* Join Requests Widget */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-foreground">Join Requests</h3>
          <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
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
              <div className="flex items-center gap-3">
                <Avatar className="w-9 h-9 bg-primary/10 text-primary">
                  {req.avatarUrl ? (
                    <AvatarImage src={req.avatarUrl} alt={req.name} />
                  ) : (
                    <AvatarFallback className="text-foreground font-medium">
                      {req.initial}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">
                    {req.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{req.batch}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 text-muted-foreground hover:text-primary transition-colors">
                  <LogIn className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-blue-500 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
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
