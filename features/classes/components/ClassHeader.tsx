"use client";

import { useState } from "react";
import { Copy, Check, Users } from "lucide-react";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { ClassDetails } from "../types";

// --chart-5 ("stone", a near-gray neutral) is deliberately excluded --
// it doesn't read as an accent, just a flat gray tile that looks broken
// rather than colored.
const ACCENT_TOKENS = ["--chart-1", "--chart-2", "--chart-3", "--chart-4"];

// Deterministic, not random -- the same class always gets the same
// accent, purely so a list of classes reads as distinct places without
// storing or inventing any per-class color data.
function accentTokenForId(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return ACCENT_TOKENS[hash % ACCENT_TOKENS.length];
}

interface ClassHeaderProps {
  classDetails: ClassDetails;
  isOwner: boolean;
  isArchived: boolean;
}

export function ClassHeader({ classDetails, isOwner, isArchived }: ClassHeaderProps) {
  const [copied, setCopied] = useState(false);
  const accentToken = accentTokenForId(classDetails.id);

  const initials = classDetails.name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const copyCode = () => {
    navigator.clipboard.writeText(classDetails.code);
    toast.success("Class code copied!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 text-accent-foreground"
          style={{ backgroundColor: `var(${accentToken})` }}
          aria-hidden
        >
          {initials}
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight">
              {classDetails.name}
            </h1>
            {isArchived && <Badge variant="secondary">Archived</Badge>}
          </div>
          {classDetails.subject && (
            <p className="text-sm text-muted-foreground">{classDetails.subject}</p>
          )}

          <div className="flex items-center gap-4 flex-wrap pt-1">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                {classDetails.owner.avatar ? (
                  <AvatarImage src={classDetails.owner.avatar} alt={classDetails.owner.name} />
                ) : (
                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                    {classDetails.owner.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="text-sm text-muted-foreground">{classDetails.owner.name}</span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>
                {classDetails.membersCount} {classDetails.membersCount === 1 ? "member" : "members"}
              </span>
            </div>

            {isOwner && (
              <button
                type="button"
                onClick={copyCode}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
              >
                <code className="font-mono px-1.5 py-0.5 rounded bg-muted text-foreground">
                  {classDetails.code}
                </code>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-primary" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {isArchived && (
        <p className="text-sm px-4 py-3 rounded-lg bg-muted text-muted-foreground border border-border">
          This class is archived. Existing content is read-only.
        </p>
      )}
    </div>
  );
}
