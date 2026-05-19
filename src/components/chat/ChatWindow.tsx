import { Paperclip, Phone, SendHorizontal, Smile, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatPreview } from "@/src/components/chat/types";

type ChatWindowProps = {
  chat: ChatPreview;
};

export function ChatWindow({ chat }: ChatWindowProps) {
  return (
    <section className="flex h-full flex-col bg-zinc-950">
      <header className="flex items-center justify-between border-b border-zinc-800 px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold text-zinc-100">
            {chat.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-100">{chat.name}</p>
            <p className="text-xs text-zinc-400">Active now</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-9 w-9 cursor-pointer text-zinc-300 hover:bg-zinc-800">
            <Phone size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 cursor-pointer text-zinc-300 hover:bg-zinc-800">
            <Video size={16} />
          </Button>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto p-5">
        <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-zinc-800 px-3 py-2 text-sm text-zinc-100">
          Hey, this is your chat window area.
        </div>
        <div className="ml-auto max-w-[75%] rounded-2xl rounded-br-sm bg-emerald-500 px-3 py-2 text-sm text-emerald-950">
          Nice. Layout is looking good.
        </div>
      </div>

      <footer className="border-t border-zinc-800 p-3">
        <div className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-2 py-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer text-zinc-400 hover:bg-zinc-800">
            <Paperclip size={15} />
          </Button>
          <Input
            placeholder="Write a message..."
            className="h-8 border-0 bg-transparent text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-0"
          />
          <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer text-zinc-400 hover:bg-zinc-800">
            <Smile size={15} />
          </Button>
          <Button size="icon" className="h-8 w-8 cursor-pointer bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
            <SendHorizontal size={15} />
          </Button>
        </div>
      </footer>
    </section>
  );
}
