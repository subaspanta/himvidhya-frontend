import { redirectToAuthModal } from "@/features/auth/utils/redirectToAuthModal";

type RegisterPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  redirectToAuthModal(await searchParams, "register");
}
