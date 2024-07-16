import prisma from "@/lib/client";
import { Prisma } from "@prisma/client";
import PostList from "./PostList";
import { unstable_cache as nextCache, revalidatePath } from "next/cache";

const getCachePosts = nextCache(getInitialPosts, ["home-posts"], {
  tags: ["home-post"],
});

async function getInitialPosts() {
  const posts = await prisma.post.findMany({
    select: {
      desc: true,
      createdAt: true,
      id: true,
      user: true,
      img: true,
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    take: 2,
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
}

export type InitialPosts = Prisma.PromiseReturnType<typeof getInitialPosts>;

const Feed = async () => {
  const initialPosts = await getCachePosts();

  return (
    <>
      <PostList initialPosts={initialPosts} />
    </>
  );
};

export default Feed;
