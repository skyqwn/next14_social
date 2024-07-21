"use server";

import prisma from "./client";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { postSchema } from "@/types/schema";
import { z } from "zod";

export async function getUser() {
  const { userId } = auth();

  if (!userId) return;

  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
      avatar: true,
      cover: true,
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });
}

export async function getIsOwner(userId: string) {
  const { userId: currentId } = auth();
  if (userId) {
    return currentId === userId;
  }
  return false;
}

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

// export const likePost = async (postId: number) => {
//   const { userId } = auth();
//   try {
//     await prisma.like.create({
//       data: {
//         postId,
//         userId: userId!,
//       },
//     });
//     revalidateTag(`like-status-${postId}`);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const dislikePost = async (postId: number) => {
//   const { userId } = auth();
//   try {
//     await prisma.like.delete({
//       where: {
//         id: {
//           postId,
//           userId: userId!,
//         },
//       },
//     });
//     revalidateTag(`like-status-${postId}`);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getIsLiked = async (postId: number) => {
//   const { userId } = auth();
//   if (!userId) throw new Error("User is not authenticated!");
//   const like = await prisma.like.findUnique({
//     where: {
//       id: {
//         postId,
//         userId,
//       },
//     },
//   });
//   return Boolean(like);
// };

export const getProfileUserInfo = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });
  revalidateTag("profile-user");
  return user;
};

export const switchFollow = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: userId,
      },
    });

    if (existingFollow) {
      await prisma.follower.delete({
        where: {
          id: existingFollow.id,
        },
      });
    } else {
      const exitstingFollowRequest = await prisma.followRequest.findFirst({
        where: {
          senderId: currentUserId,
          receiverId: userId,
        },
      });

      if (exitstingFollowRequest) {
        await prisma.followRequest.delete({
          where: {
            id: exitstingFollowRequest.id,
          },
        });
      } else {
        await prisma.followRequest.create({
          data: {
            senderId: currentUserId,
            receiverId: userId,
          },
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!");
  }
};

export const switchBlock = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingBlock = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: userId,
      },
    });

    if (existingBlock) {
      await prisma.block.delete({
        where: {
          id: existingBlock.id,
        },
      });
    } else {
      await prisma.block.create({
        data: {
          blockerId: currentUserId,
          blockedId: userId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Something wrong error!");
  }
};

export const acceptFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });

      await prisma.follower.create({
        data: {
          followerId: userId,
          followingId: currentUserId,
        },
      });
    }
    revalidateTag("profile-user");
  } catch (error) {
    console.log(error);
    throw new Error("Something wrong Error!");
  }
};

export const declineFollowRequest = async (userId: string) => {
  const { userId: currentUserId } = auth();

  if (!currentUserId) {
    throw new Error("User is not authenticated!");
  }

  try {
    const existingFollowRequest = await prisma.followRequest.findFirst({
      where: {
        senderId: userId,
        receiverId: currentUserId,
      },
    });

    if (existingFollowRequest) {
      await prisma.followRequest.delete({
        where: {
          id: existingFollowRequest.id,
        },
      });
    }
    revalidateTag("profile-user");
  } catch (error) {
    console.log(error);
    throw new Error("Something wrong Error!");
  }
};

export const updateProfile = async (_: any, formData: FormData) => {
  const fields = Object.fromEntries(formData);
  console.log(fields);
  const filterFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== "")
  );

  const Profile = z.object({
    cover: z.string().optional(),
    description: z.string().max(100).optional(),
    city: z.string().optional(),
    school: z.string().optional(),
    work: z.string().optional(),
    website: z.string().optional(),
  });

  const validatedFields = Profile.safeParse(filterFields);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { success: false, error: true };
  }

  const { userId } = auth();
  if (!userId) {
    return { success: false, error: true };
  }

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: validatedFields.data,
    });

    revalidateTag("profile-user");
    return { success: true, error: false };
  } catch (error) {
    return { success: false, error: true };
  }
};
