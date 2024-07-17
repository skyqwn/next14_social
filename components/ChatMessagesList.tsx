"use client";

import { useEffect, useRef, useState } from "react";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import { FaArrowUp } from "react-icons/fa";
import Image from "next/image";

import { InitialChatMessages } from "@/app/chats/[id]/page";
import { cn } from "@/lib/utils";
import { saveMessage } from "@/app/chats/actions";

const SUPABASE_PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllend4bnByc2JoZXdhd3FudXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExODQyMTIsImV4cCI6MjAzNjc2MDIxMn0.RA2n_-nBQe_dJDQLdwpVJWm-LwQ4oElDpS1p0KPqUGM";

const SUPABASE_URL = "https://iezwxnprsbhewawqnuqr.supabase.co";

interface ChatMessageListProps {
  initialMessages: InitialChatMessages;
  userId: string;
  chatRoomId: string;
  username: string;
  avatar: string;
}

const ChatMessagesList = ({
  initialMessages,
  userId,
  chatRoomId,
  username,
  avatar,
}: ChatMessageListProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const channel = useRef<RealtimeChannel>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessages((prevMsgs) => [
      ...prevMsgs,
      {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          username: "string",
          avatar: "string",
        },
      },
    ]);
    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          username,
          avatar,
        },
      },
    });
    await saveMessage(message, chatRoomId);
    setMessage("");
  };

  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current
      .on("broadcast", { event: "message" }, (payload) => {
        setMessages((prevMsgs) => [...prevMsgs, payload.payload]);
      })
      .subscribe();

    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);

  return (
    <div className="py-4 flex flex-col gap-5 min-h-[calc(100vh-96px)] justify-end">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            "flex gap-2 items-start",
            message.userId === userId ? "justify-end" : ""
          )}
        >
          {message.userId === userId ? null : (
            <Image
              src={message.user.avatar!}
              alt={message.user.username}
              width={32}
              height={32}
              className="rounded-full size-8"
            />
          )}
          <div
            className={cn(
              "flex flex-col gap-1",
              message.userId === userId ? "items-end" : ""
            )}
          >
            <span
              className={cn(
                "text-white p-2.5 rounded-md",
                message.userId === userId ? "bg-neutral-500" : "bg-blue-500"
              )}
            >
              {message.payload}
            </span>
            <span className="text-xs">day</span>
          </div>
        </div>
      ))}
      <form className="flex relative" onSubmit={onSubmit}>
        <input
          required
          onChange={onChange}
          value={message}
          className="bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
          type="text"
          name="message"
          placeholder="Write a message..."
        />
        <button className="absolute right-1.5 bottom-2.5 hover:text-blue-300 transition-colors">
          <FaArrowUp size={20} className="text-blue-500 transition-colors" />
        </button>
      </form>
    </div>
  );
};

export default ChatMessagesList;
