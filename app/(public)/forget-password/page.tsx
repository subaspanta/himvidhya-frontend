import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 bg-surface border border-border rounded-2xl shadow-2xl">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
