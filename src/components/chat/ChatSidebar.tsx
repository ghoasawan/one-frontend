import { Search, Plus, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatListItemCard } from "@/src/components/chat/ChatListItemCard";
import { ChatPreview } from "@/src/components/chat/types";

type ChatSidebarProps = {
  chats: ChatPreview[];
  activeChatId: string;
  onSelectChat: (chatId: string) => void;
};

export function ChatSidebar({ chats, activeChatId, onSelectChat }: ChatSidebarProps) {
  return (
    <aside className="flex h-full flex-col border-r border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 p-3">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-sm font-semibold text-zinc-100">Chats</h1>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-300 hover:bg-zinc-800">
              <SlidersHorizontal size={15} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-300 hover:bg-zinc-800">
              <Plus size={16} />
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <Input
            placeholder="Search chats..."
            className="h-9 border-zinc-700 bg-zinc-900 pl-8 text-zinc-100 placeholder:text-zinc-500"
          />
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {chats.map((chat) => (
          <ChatListItemCard
            key={chat.id}
            chat={chat}
            isActive={chat.id === activeChatId}
            onClick={() => onSelectChat(chat.id)}
          />
        ))}
      </div>
    </aside>
  );
}

