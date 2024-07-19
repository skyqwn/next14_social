import prisma from "@/lib/client";
import { redirect } from "next/navigation";
import { TbMessageChatbot } from "react-icons/tb";

interface CreateMessageButtonProps {
  userId: string;
  currentUserId: string;
}

const CreateMessageButton = ({
  userId,
  currentUserId,
}: CreateMessageButtonProps) => {
  const createChatRoom = async () => {
    "use server";
    if (!currentUserId) return;

    const existingChatRoom = await prisma.chatRoom.findFirst({
      where: {
        AND: [
          {
            users: {
              some: {
                id: currentUserId,
              },
            },
          },
          {
            users: {
              some: {
                id: userId,
              },
            },
          },
        ],
      },
      select: {
        id: true,
      },
    });

    if (existingChatRoom) {
      redirect(`/chats/${existingChatRoom.id}`);
    } else {
      const room = await prisma.chatRoom.create({
        data: {
          users: {
            connect: [
              { id: userId },
              {
                id: currentUserId,
              },
            ],
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/chats/${room.id}`);
    }
  };
  return (
    <form
      action={createChatRoom}
      className="bg-blue-500 text-white p-2 rounded-xl cursor-pointer w-full text-center hover:bg-blue-300 transition-colors flex items-center justify-center gap-2"
    >
      <button>메시지 보내기</button>
      <TbMessageChatbot size={18} />
    </form>
  );
};

export default CreateMessageButton;
