import AuthProvider from "@/providers/auth-provider";

export default function PublicLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {children}
      {modal}
    </AuthProvider>
  );
}
