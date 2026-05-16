import { Bell, MessageSquare, Settings, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MiniSidebar() {
  return (
    <aside className="flex h-full w-[72px] flex-col items-center justify-between border-r border-violet-500/15 bg-zinc-900 py-4">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-400/25 bg-violet-500/15 text-violet-200">
          <UserCircle2 size={22} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 cursor-pointer rounded-xl text-zinc-300 hover:bg-violet-500/15 hover:text-violet-200"
          >
            <MessageSquare size={18} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 cursor-pointer rounded-xl text-zinc-300 hover:bg-violet-500/15 hover:text-violet-200"
          >
            <Bell size={18} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 cursor-pointer rounded-xl text-zinc-300 hover:bg-violet-500/15 hover:text-violet-200"
        >
          <Settings size={18} />
        </Button>
      </div>
    </aside>
  );
}
