"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useCreateComment } from "../hooks/useCreateComment";

const createCommentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Comment cannot be empty")
    .max(2000, "Comment cannot exceed 2000 characters"),
});

type CreateCommentFormData = z.infer<typeof createCommentSchema>;

interface CommentComposerProps {
  postId: string;
}

export function CommentComposer({ postId }: CommentComposerProps) {
  const { mutateAsync: createComment, isPending } = useCreateComment(postId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateCommentFormData>({
    mode: "onSubmit",
    resolver: zodResolver(createCommentSchema),
    defaultValues: { content: "" },
  });

  const isBusy = isPending || isSubmitting;

  const submitComment = async (data: CreateCommentFormData) => {
    try {
      await createComment(data);
      reset({ content: "" });
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? (error.response?.data as { message?: string } | undefined)
              ?.message || error.message
          : "Unable to post comment. Please try again.";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitComment)} className="flex flex-col gap-2">
      <label htmlFor={`comment-${postId}`} className="sr-only">
        Write a comment
      </label>
      <textarea
        id={`comment-${postId}`}
        placeholder="Write a comment..."
        disabled={isBusy}
        className="w-full min-h-[64px] px-3 py-2 text-sm border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed resize-vertical"
        {...register("content")}
      />
      {errors.content?.message && (
        <p className="text-sm text-destructive">{errors.content.message}</p>
      )}
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={isBusy}>
          {isBusy ? "Posting..." : "Comment"}
        </Button>
      </div>
    </form>
  );
}
