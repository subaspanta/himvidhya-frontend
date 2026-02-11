import ChatLanding from "@/features/chat/components/ChatLanding";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Mitva - Chat",
  description: "Conversations",
};

export default async function ChatPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (!token) {
    redirect("/login");
  }
  return <ChatLanding />;
}
