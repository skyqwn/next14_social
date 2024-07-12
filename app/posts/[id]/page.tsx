import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.locale("ko");
dayjs.extend(relativeTime);

async function getIsOwner(userId: string) {
  const { userId: currentId } = auth();
  if (userId) {
    return currentId === userId;
  }
  return false;
}

async function getPost(id: number) {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return post;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Posts!! ${params.id}`,
  };
}

const PostDetail = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const post = await getPost(id);
  if (!post) return notFound();

  const isOwner = await getIsOwner(post.userId);

  return (
    <div className="flex flex-col gap-3 w-full ">
      <section className="relative aspect-square">
        <Image
          className="object-cover rounded-md"
          fill
          alt={post.id + ""}
          src={`${post.img}/public`}
        />
      </section>
      <section className="flex items-center justify-between border-b border-slate-200 p-2">
        <div className="flex gap-2 items-center ">
          <div>
            <Image
              src={post.user.avatar || "/noAvatar.png"}
              alt={post.id + ""}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div>
            <h2 className="font-semibold">{post.user.username}</h2>
          </div>
        </div>
        <div className="text-sm text-slate-600">
          <span>{dayjs(post.createdAt).fromNow()}</span>
        </div>
      </section>
      <section>
        <p>{post.desc}</p>
      </section>
    </div>
  );
};

export default PostDetail;
