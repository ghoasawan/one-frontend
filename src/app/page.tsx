"use client"

import React, { useMemo, useState } from "react";
import { ChatSidebar } from "@/src/components/chat/ChatSidebar";
import { ChatWindow } from "@/src/components/chat/ChatWindow";
import { ChatPreview } from "@/src/components/chat/types";

const MOCK_CHATS: ChatPreview[] = [
  {
    id: "1",
    name: "Ava Thompson",
    lastMessage: "Can you share the updated files?",
    lastMessageTime: "10:42 AM",
    avatar: "AT",
    unread: 2,
  },
  {
    id: "2",
    name: "Noah Carter",
    lastMessage: "I will join the call in 5 minutes.",
    lastMessageTime: "9:18 AM",
    avatar: "NC",
  },
  {
    id: "3",
    name: "Mia Rodriguez",
    lastMessage: "Great, let's push this today.",
    lastMessageTime: "Yesterday",
    avatar: "MR",
  },
  {
    id: "4",
    name: "Team Support",
    lastMessage: "Ticket #3241 has been resolved.",
    lastMessageTime: "Yesterday",
    avatar: "TS",
  },
];

export default function HomePage() {
  const [activeChatId, setActiveChatId] = useState<string>(MOCK_CHATS[0].id);
  const activeChat = useMemo(
    () => MOCK_CHATS.find((chat) => chat.id === activeChatId) ?? MOCK_CHATS[0],
    [activeChatId],
  );

  return (
    <main className="h-screen w-full bg-zinc-950 text-zinc-100">
      <div className="flex h-full w-full">
        <section className="h-full w-1/4 min-w-[280px] border-r border-zinc-800">
          <ChatSidebar
            chats={MOCK_CHATS}
            activeChatId={activeChatId}
            onSelectChat={setActiveChatId}
          />
        </section>
        <section className="h-full w-3/4">
          <ChatWindow chat={activeChat} />
        </section>
      </div>
    </main>
  );
}
