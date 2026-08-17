import { redirectToAuthModal } from "@/features/auth/utils/redirectToAuthModal";

type ForgotPasswordPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ForgotPasswordPage({
  searchParams,
}: ForgotPasswordPageProps) {
  redirectToAuthModal(await searchParams, "forgot-password");
}
