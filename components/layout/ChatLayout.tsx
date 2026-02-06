"use client";

interface ChatLayoutProps {
  sidebar: React.ReactNode;
  conversationList: React.ReactNode;
  chatArea: React.ReactNode;
  detailsPanel?: React.ReactNode;
  showDetails?: boolean;
  onToggleDetails?: () => void;
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({
  sidebar,
  conversationList,
  chatArea,
  detailsPanel,
  showDetails = false,
}) => {
  return (
    <div className="flex h-screen w-full bg-jet_black-100">
      <aside className="w-sidebar shrink-0 bg-jet_black-200 border-r border-jet_black-600">
        {sidebar}
      </aside>

      <aside className="w-conversations shrink-0 bg-jet_black-300 border-r border-jet_black-600 flex flex-col">
        {conversationList}
      </aside>

      <main className="flex-1 flex flex-col bg-jet_black-100 min-w-0">
        {chatArea}
      </main>

      {showDetails && detailsPanel && (
        <aside className="w-88 max-w-88 shrink-0 bg-jet_black-300 border-l border-jet_black-600 overflow-y-auto z-10">
          {detailsPanel}
        </aside>
      )}
    </div>
  );
};

export default ChatLayout;
