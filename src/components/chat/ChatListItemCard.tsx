import { MessageCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { ChatPreview } from "@/src/components/chat/types";

type ChatListItemCardProps = {
  chat: ChatPreview;
  isActive?: boolean;
  onClick?: () => void;
};

export function ChatListItemCard({
  chat,
  isActive = false,
  onClick,
}: ChatListItemCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-xl border px-3 py-2.5 text-left transition-colors",
        "hover:border-zinc-700 hover:bg-zinc-900",
        isActive
          ? "border-zinc-600 bg-zinc-900"
          : "border-zinc-800 bg-zinc-950/60",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-200">
          {chat.avatar ? (
            <span className="text-sm font-semibold">{chat.avatar}</span>
          ) : (
            <MessageCircle size={16} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-semibold text-zinc-100">{chat.name}</p>
            <span className="shrink-0 text-xs text-zinc-400">{chat.lastMessageTime}</span>
          </div>
          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="truncate text-xs text-zinc-400">{chat.lastMessage}</p>
            {chat.unread ? (
              <span className="rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-950">
                {chat.unread}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
}

