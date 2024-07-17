import ChatMessagesList from "@/components/ChatMessagesList";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

async function getRoom(id: string) {
  const room = await prisma.chatRoom.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: {
          id: true,
        },
      },
    },
  });
  if (room) {
    const { userId } = auth();
    const canSee = Boolean(room.users.find((user) => user.id === userId));
    if (!canSee) {
      return null;
    }
  }
  return room;
}

async function getMessages(chatRoomId: string) {
  const messages = await prisma.message.findMany({
    where: {
      chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  return messages;
}

async function getUserProfile() {
  const { userId } = auth();
  const user = await prisma.user.findUnique({
    where: {
      id: userId!,
    },
    select: {
      username: true,
      avatar: true,
    },
  });
  return user;
}

export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessages>;

const ChatRoom = async ({ params }: { params: { id: string } }) => {
  const room = await getRoom(params.id);
  const user = await getUserProfile();
  if (!user) return notFound();
  if (!room) {
    return notFound();
  }
  const initialMessages = await getMessages(params.id);
  const { userId } = auth();
  return (
    <>
      <ChatMessagesList
        chatRoomId={params.id}
        userId={userId!}
        username={user.username}
        avatar={user.avatar ?? "/noAvatar"}
        initialMessages={initialMessages}
      />
    </>
  );
};

export default ChatRoom;
