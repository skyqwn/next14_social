"use server";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import { unstable_cache as nextCache, revalidateTag } from "next/cache";

// async function getLikeStatus(postId: number, userId: string) {
//   const isLiked = await prisma.like.findUnique({
//     where: {
//       id: {
//         userId,
//         postId,
//       },
//     },
//   });

//   const likeCount = await prisma.like.count({
//     where: {
//       postId,
//     },
//   });

//   return { isLiked: Boolean(isLiked), likeCount };
// }

// export async function getCachedLikeStatus(postId: number) {
//   const { userId } = auth();
//   if (!userId) return;
//   const cachedOperation = nextCache(getLikeStatus, ["post-like-status"], {
//     tags: [`like-status-${postId}`],
//   });
//   return cachedOperation(postId, userId);
// }

export const switchPostLike = async (postId: number) => {
  const { userId } = auth();

  if (!userId) throw new Error("User is not authenticated!");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      });
    }
    revalidateTag("post-detail");
  } catch (error) {
    console.log(error);
    throw new Error("Something went Wrong!");
  }
};

export async function switchCommentLike(commentId: number) {
  const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated!");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        commentId,
        userId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
    } else {
      await prisma.like.create({
        data: {
          commentId,
          userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went Wrong!");
  }
}
