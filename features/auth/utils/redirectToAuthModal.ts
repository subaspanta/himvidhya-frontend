import { redirect } from "next/navigation";

export type AuthModalSearchParams = Record<string, string | string[] | undefined>;

export function redirectToAuthModal(
  searchParams: AuthModalSearchParams | undefined,
  mode: "login" | "register" | "forgot-password",
): never {
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

  params.set("auth", mode);

  redirect(`/?${params.toString()}`);
}
