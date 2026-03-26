import { redirect } from "next/navigation";

type RegisterPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function RegisterPage({ searchParams }: RegisterPageProps) {
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

  params.set("auth", "register");

  redirect(`/?${params.toString()}`);
}
