import ChatList from "@/components/ChatList";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { unstable_cache as next_cache } from "next/cache";

async function getAllChats(userId: string) {
  const chats = await prisma.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      messages: {
        take: 1,
        orderBy: {
          created_at: "desc",
        },
      },
      users: {
        where: {
          id: {
            not: userId,
          },
        },
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  return chats;
}

const getCachedAllChats = next_cache(getAllChats, ["chat-list"], {
  tags: ["chat-list"],
});

export type InitialChatList = Prisma.PromiseReturnType<
  typeof getCachedAllChats
>;

const Chats = async () => {
  const { userId } = auth();
  const chats = await getAllChats(userId!);
  return (
    <div className="p-4">
      <h2 className="font-semibold text-3xl">채팅리스트</h2>
      {chats.map((chat) => (
        <ChatList
          key={chat.id}
          messages={chat.messages}
          chatId={chat.id}
          users={chat.users}
          userId={userId!}
        />
      ))}
    </div>
  );
};

export default Chats;
