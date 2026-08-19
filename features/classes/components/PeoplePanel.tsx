"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListRowSkeletonGroup } from "@/components/ui/skeleton";
import { extractErrorMessage } from "@/shared/utils";
import { useClassMembers } from "../hooks/useClassMembers";
import { useRemoveClassMember } from "../hooks/useRemoveClassMember";
import { useClassContext } from "../context/ClassContext";

export function PeoplePanel() {
  const { classDetails, isOwner } = useClassContext();
  const { data: members, isLoading, isError, refetch } = useClassMembers(classDetails.id);

  const removeMember = useRemoveClassMember();
  const [confirmingUserId, setConfirmingUserId] = useState<string | null>(null);

  const handleRemove = (userId: string) => {
    removeMember.mutate(
      { classId: classDetails.id, userId },
      {
        onSuccess: () => {
          toast.success("Member removed");
          setConfirmingUserId(null);
        },
        onError: (error) => {
          toast.error(extractErrorMessage(error, "Unable to remove member."));
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Teacher
        </h2>
        <div className="flex items-center justify-between py-2 border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="w-9 h-9 shrink-0">
              {classDetails.owner.avatar ? (
                <AvatarImage src={classDetails.owner.avatar} alt={classDetails.owner.name} />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary font-medium text-sm">
                  {classDetails.owner.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="min-w-0">
              <p className="font-medium text-foreground truncate">{classDetails.owner.name}</p>
              <p className="text-sm text-muted-foreground truncate">{classDetails.owner.email}</p>
            </div>
          </div>
          <Badge>Teacher</Badge>
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
          Students {members ? `(${members.length})` : ""}
        </h2>

        {isLoading && <ListRowSkeletonGroup count={4} />}

        {isError && (
          <div className="py-4 space-y-2">
            <p className="text-sm text-destructive">Unable to load members.</p>
            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        )}

        {!isLoading && !isError && members?.length === 0 && (
          <p className="text-sm text-muted-foreground py-4">
            No students have joined this class yet.
          </p>
        )}

        {!isLoading && !isError && members && members.length > 0 && (
          <ul className="divide-y divide-border">
            {members.map((member) => (
              <li key={member.user._id} className="py-2.5">
                {confirmingUserId === member.user._id ? (
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-foreground min-w-0">
                      Remove {member.user.name}?
                    </p>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setConfirmingUserId(null)}
                        disabled={removeMember.isPending}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemove(member.user._id)}
                        disabled={removeMember.isPending}
                      >
                        {removeMember.isPending ? "Removing..." : "Remove"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="w-9 h-9 shrink-0">
                        {member.user.avatar ? (
                          <AvatarImage src={member.user.avatar} alt={member.user.name} />
                        ) : (
                          <AvatarFallback className="bg-muted text-foreground font-medium text-sm">
                            {member.user.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{member.user.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{member.user.email}</p>
                      </div>
                    </div>
                    {isOwner && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0 ml-3"
                        onClick={() => setConfirmingUserId(member.user._id)}
                        aria-label={`Remove ${member.user.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
