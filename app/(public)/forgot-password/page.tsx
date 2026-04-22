import { redirect } from "next/navigation";

type ForgotPasswordPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function ForgotPasswordPage({
  searchParams,
}: ForgotPasswordPageProps) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (typeof value === "string") {
      params.set(key, value);
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((entry) => params.append(key, entry));
    }
  }

  params.set("auth", "forgot-password");

  redirect(`/?${params.toString()}`);
}
