"use client";

import React from "react";
import { CheckCircle2, XCircle, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ListRowSkeletonGroup } from "@/components/ui/skeleton";
import { extractErrorMessage } from "@/shared/utils";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useJoinRequests } from "@/features/classes/hooks/useJoinRequests";
import { useJoinRequestsCount } from "@/features/classes/hooks/useJoinRequestsCount";
import { useApproveJoinRequest } from "@/features/classes/hooks/useApproveJoinRequest";
import { useRejectJoinRequest } from "@/features/classes/hooks/useRejectJoinRequest";

export default function RightAside() {
  const { user } = useAuthStore();
  const isTeacher = user?.role === "teacher";

  const {
    data: requests = [],
    isLoading,
    isError,
  } = useJoinRequests({ enabled: isTeacher });
  const { data: count = 0 } = useJoinRequestsCount({ enabled: isTeacher });
  const approve = useApproveJoinRequest();
  const reject = useRejectJoinRequest();

  if (!isTeacher) {
    return null;
  }

  const handleApprove = (requestId: string) => {
    approve.mutate(requestId, {
      onError: (error) => {
        toast.error(extractErrorMessage(error, "Unable to approve request."));
      },
    });
  };

  const handleReject = (requestId: string) => {
    reject.mutate(requestId, {
      onError: (error) => {
        toast.error(extractErrorMessage(error, "Unable to reject request."));
      },
    });
  };

  return (
    <aside className="w-full lg:w-[300px] shrink-0 flex flex-col gap-8 lg:sticky lg:top-8 lg:self-start">
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <UserPlus className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-base text-foreground">
              Join Requests
            </h3>
          </div>
          {count > 0 && (
            <span className="relative flex items-center gap-1 text-xs font-semibold bg-primary text-primary-foreground py-1 px-2.5 rounded-full shrink-0 shadow-sm">
              <span className="relative flex w-1.5 h-1.5">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground/70" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-primary-foreground" />
              </span>
              {count} New
            </span>
          )}
        </div>

        {isLoading ? (
          <ListRowSkeletonGroup count={2} />
        ) : isError ? (
          <p className="text-sm text-destructive">
            Unable to load requests.
          </p>
        ) : requests.length === 0 ? (
          <p className="text-sm text-muted-foreground">No pending requests.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {requests.map((req, index) => {
              const isApproving =
                approve.isPending && approve.variables === req._id;
              const isRejecting =
                reject.isPending && reject.variables === req._id;
              const isBusy = isApproving || isRejecting;

              return (
                <div
                  key={req._id}
                  style={{ animationDelay: `${index * 60}ms` }}
                  className="group motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-right-2 fill-mode-both flex items-center justify-between p-3 rounded-xl bg-card shadow-xs transition-[background-color,box-shadow] duration-200 ease-out hover:shadow-card hover:bg-primary/[0.03]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="w-9 h-9 shrink-0 ring-2 ring-primary/15 group-hover:ring-primary/30 transition-all duration-200 ease-out">
                      {req.user.avatar ? (
                        <AvatarImage
                          src={req.user.avatar}
                          alt={req.user.name}
                        />
                      ) : (
                        <AvatarFallback className="bg-primary/10 text-foreground font-medium text-sm">
                          {req.user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="min-w-0">
                      <h4 className="text-sm font-medium text-foreground truncate">
                        {req.user.name}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate">
                        {req.class.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0 ml-2">
                    <button
                      type="button"
                      onClick={() => handleReject(req._id)}
                      disabled={isBusy}
                      aria-label="Reject request"
                      className="p-1.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 active:scale-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApprove(req._id)}
                      disabled={isBusy}
                      aria-label="Approve request"
                      className="p-1.5 rounded-full text-primary-foreground bg-primary shadow-sm hover:bg-primary-hover hover:shadow-md active:scale-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </aside>
  );
}
