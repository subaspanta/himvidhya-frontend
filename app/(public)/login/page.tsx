import { LoginForm } from "@/features/auth/components/LoginForm";

// This page will render the login form for unauthenticated users
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
      <div className="max-w-md w-full p-8 bg-[#151b23] border border-white/10 rounded-2xl shadow-2xl">
        <LoginForm />
      </div>
    </div>
  );
}
