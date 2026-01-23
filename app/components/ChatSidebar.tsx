import { mockConversations } from "../lib/mock";

export default function ChatSidebar() {
  return (
    <aside className="w-72 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Chats</h2>

      <ul className="space-y-2">
        {mockConversations.map((chat) => (
          <li
            key={chat.id}
            className="p-3 rounded bg-gray-800 hover:bg-gray-700 cursor-pointer"
          >
            {chat.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
