import prisma from "@/lib/client";
import { Prisma } from "@prisma/client";
import PostList from "./PostList";

async function getInitialPosts() {
  const posts = await prisma.post.findMany({
    select: {
      desc: true,
      createdAt: true,
      id: true,
      user: true,
      img: true,
    },
    take: 1,
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
}

export type InitialPosts = Prisma.PromiseReturnType<typeof getInitialPosts>;

const Feed = async () => {
  const initialPosts = await getInitialPosts();
  return (
    <>
      <PostList initialPosts={initialPosts} />
    </>
  );
};

export default Feed;
