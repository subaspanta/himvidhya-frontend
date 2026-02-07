import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function RegisterPage() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/chat");
    }
  }, [isAuthenticated, router]);
  return (
    <AuthPageLayout>
      <AuthModals
        openModal="register"
        onCloseModal={() => {}}
        onSwitchToLogin={() => router.push("/")}
      />
    </AuthPageLayout>
  );
}
