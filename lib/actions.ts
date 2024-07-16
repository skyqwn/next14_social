"use server";

import z from "zod";
import prisma from "./client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { postSchema } from "@/types/schema";

export async function uploadPost(formData: FormData) {
  // const data = Object.fromEntries(formData);
  const data = { photo: formData.get("photo"), desc: formData.get("desc") };

  const result = postSchema.safeParse(data);

  const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated!");

  if (!result.success) {
    return result.error.flatten();
  } else {
    const post = await prisma.post.create({
      data: {
        desc: result.data.desc,
        userId,
        img: result.data.photo,
      },
      select: {
        id: true,
      },
    });
    revalidateTag("home-post");
    return redirect(`/posts/${post.id}`);
  }
}

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
    }
  );

  const data = await response.json();
  return data;
}

export async function getMorePosts(page: number) {
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
    skip: page * 1,
    take: 1,
    orderBy: {
      createdAt: "desc",
    },
  });
  return posts;
}

export const likePost = async (postId: number) => {
  const { userId } = auth();
  try {
    await prisma.like.create({
      data: {
        postId,
        userId: userId!,
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (error) {
    console.log(error);
  }
};

export const dislikePost = async (postId: number) => {
  const { userId } = auth();
  try {
    await prisma.like.delete({
      where: {
        id: {
          postId,
          userId: userId!,
        },
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (error) {
    console.log(error);
  }
};

export const getIsLiked = async (postId: number) => {
  const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated!");
  const like = await prisma.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });
  return Boolean(like);
};

export const createComment = async (postId: number, desc: string) => {
  const { userId } = auth();
  try {
    if (!userId) throw new Error("User is not authenticated!");

    const comment = await prisma.comment.create({
      data: {
        postId,
        desc,
        userId,
      },
      select: {
        user: true,
        id: true,
        desc: true,
        createdAt: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
    revalidateTag(`comment-${postId}`);
    return comment;
  } catch (error) {
    console.log(error);
    throw new Error("Something went Wrong!");
  }
};
