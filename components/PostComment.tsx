import prisma from "@/lib/client";
import { Prisma } from "@prisma/client";
import CommentList from "./CommentList";
import { revalidateTag, unstable_cache as nextCache } from "next/cache";

interface CommentProps {
  postId: number;
}

async function getComments(postId: number) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    select: {
      user: true,
      desc: true,
      id: true,
      createdAt: true,
      _count: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
}

async function getCachedComments(postId: number) {
  const cachedOperation = nextCache(getComments, [`post-comment-${postId}`], {
    tags: [`comment-${postId}`],
  });
  return cachedOperation(postId);
}

export type InitialComments = Prisma.PromiseReturnType<typeof getComments>;

const PostComment = async ({ postId }: CommentProps) => {
  const initialComments = await getCachedComments(postId);
  return (
    <>
      <CommentList initialComments={initialComments} postId={postId} />
    </>
  );
};

export default PostComment;
