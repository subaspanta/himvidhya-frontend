import { redirect } from "next/navigation";

type RegisterPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries((await searchParams) ?? {})) {
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
