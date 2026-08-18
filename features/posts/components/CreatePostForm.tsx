"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TextField from "@/components/ui/text-field";
import { useCreatePost } from "../hooks/useCreatePost";

const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title cannot exceed 200 characters"),
  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .max(10000, "Content cannot exceed 10000 characters"),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

interface CreatePostFormProps {
  classId: string;
}

export function CreatePostForm({ classId }: CreatePostFormProps) {
  const { mutateAsync: createPost, isPending } = useCreatePost(classId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<CreatePostFormData>({
    mode: "onSubmit",
    resolver: zodResolver(createPostSchema),
    defaultValues: { title: "", content: "" },
  });

  const isBusy = isPending || isSubmitting;

  const submitPost = async (data: CreatePostFormData) => {
    try {
      await createPost(data);
      toast.success("Post created");
      reset({ title: "", content: "" });
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? (error.response?.data as { message?: string } | undefined)
              ?.message || error.message
          : "Unable to create post. Please try again.";

      setError("root", { type: "server", message });
      toast.error(message);
    }
  };

  return (
    <Card className="p-5">
      <form onSubmit={handleSubmit(submitPost)} className="space-y-4">
        <TextField
          label="Title"
          required
          disabled={isBusy}
          error={errors.title?.message}
          {...register("title")}
        />

        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            disabled={isBusy}
            className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed resize-vertical"
            {...register("content")}
          />
          {errors.content?.message && (
            <p className="text-sm text-destructive mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        {errors.root?.message && (
          <p className="text-sm text-destructive">{errors.root.message}</p>
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={isBusy}>
            {isBusy ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
