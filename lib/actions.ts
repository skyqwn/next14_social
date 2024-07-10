"use server";

import z from "zod";
import prisma from "./client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const postSchema = z.object({
  photo: z.string(),
  desc: z.string({
    required_error: "설명을 입력해주세요!",
  }),
});

export async function uploadPost(_: any, formData: FormData) {
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
