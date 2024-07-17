import Image from "next/image";
import Link from "next/link";

interface ChatListProps {
  messages: {
    id: number;
    payload: string;
    created_at: Date;
    updated_at: Date;
    chatRoomId: string;
    userId: string;
  }[];
  chatId: string;
  users: {
    username: string;
    avatar: string | null;
  }[];
  userId: string;
}

const ChatList = ({ messages, chatId, users, userId }: ChatListProps) => {
  const user = users[0];
  const message = messages[0];
  return (
    <Link
      href={`/chats/${chatId}`}
      className="flex gap-5 mt-10 items-center hover:opacity-80 transition-opacity bg-white p-5 rounded-md"
    >
      <Image
        src={user.avatar ?? "/noAvatar"}
        alt={user.username}
        width={60}
        height={60}
        className="rounded-md"
      />
      <div>
        <h2 className="text-lg">{user.username}</h2>
        {message && (
          <>
            <h3 className="text-sm text-neutral-500">
              <span className="text-neutral-400">
                {message.userId === userId ? "나" : user.username}:
              </span>{" "}
              {message.payload}
            </h3>
          </>
        )}
      </div>
    </Link>
  );
};

export default ChatList;
