import { redirectToAuthModal } from "@/features/auth/utils/redirectToAuthModal";

type LoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  redirectToAuthModal(await searchParams, "login");
}
