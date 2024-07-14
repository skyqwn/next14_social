import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  unstable_cache as nextCache,
  revalidatePath,
  revalidateTag,
} from "next/cache";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { IoShareOutline } from "react-icons/io5";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getIsLiked } from "@/lib/actions";
import LikeButton from "@/components/LikeButton";
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

async function getPostDesc(id: number) {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    select: {
      desc: true,
    },
  });
  return post;
}

const getCachedPost = nextCache(getPost, ["post-detail"], {
  tags: ["post-detail", "xxx"],
});

const getCachedPostDesc = nextCache(getPostDesc, ["post-desc"], {
  tags: ["post-desc", "xxx"],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getCachedPostDesc(+params.id);
  return {
    title: post?.desc,
  };
}

async function getLikeStatus(postId: number, userId: string) {
  const isLiked = await prisma.like.findUnique({
    where: {
      id: {
        userId,
        postId,
      },
    },
  });

  const likeCount = await prisma.like.count({
    where: {
      postId,
    },
  });

  return { isLiked: Boolean(isLiked), likeCount };
}

async function getCachedLikeStatus(postId: number) {
  const { userId } = auth();
  if (!userId) return;
  const cachedOperation = nextCache(getLikeStatus, ["post-like-status"], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId, userId);
}

const PostDetail = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const post = await getCachedPost(id);
  if (!post) return notFound();

  const isOwner = await getIsOwner(post.userId);

  const revalidate = async () => {
    "use server";
    revalidateTag("xxx");
  };

  const likeStatus = await getCachedLikeStatus(id);

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
            <form action={revalidate}>
              <button>revalidate desc-cache</button>
            </form>
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
      <div className="flex items-center justify-between text-sm my-4">
        <div className="flex gap-8">
          <LikeButton
            isLiked={likeStatus?.isLiked!}
            likeCount={likeStatus?.likeCount!}
            postId={id}
          />
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <FaRegCommentDots size={20} className="cursor-pointer" />
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">
              {/* {post._count.comments} */}
              <span className="hidden md:inline"> Comments</span>
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <IoShareOutline size={20} className="cursor-pointer" />
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">
              98<span className="hidden md:inline"> Shares</span>
            </span>
          </div>
        </div>
      </div>
      <section>
        <p>{post.desc}</p>
      </section>
    </div>
  );
};

export default PostDetail;

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });
  return posts.map((post) => ({ id: post.id + "" }));
}
