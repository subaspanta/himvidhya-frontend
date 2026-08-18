"use client";

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/shared/loading/Spinner";
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
          <h3 className="font-medium text-base text-foreground">
            Join Requests
          </h3>
          {count > 0 && (
            <span className="text-xs font-medium bg-primary/10 text-primary py-1 px-2 rounded-full shrink-0">
              {count} New
            </span>
          )}
        </div>

        {isLoading ? (
          <Spinner size={20} />
        ) : isError ? (
          <p className="text-sm text-muted-foreground">
            Unable to load requests.
          </p>
        ) : requests.length === 0 ? (
          <p className="text-sm text-muted-foreground">No pending requests.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {requests.map((req) => {
              const isApproving =
                approve.isPending && approve.variables === req._id;
              const isRejecting =
                reject.isPending && reject.variables === req._id;
              const isBusy = isApproving || isRejecting;

              return (
                <div
                  key={req._id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="w-9 h-9 shrink-0">
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
                      className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApprove(req._id)}
                      disabled={isBusy}
                      aria-label="Approve request"
                      className="p-1.5 rounded-md text-primary bg-primary/10 hover:bg-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
