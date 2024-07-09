"use server";

import z from "zod";
import fs from "fs/promises";
import prisma from "./client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const postSchema = z.object({
  photo: z.string(),
  desc: z.string({
    required_error: "설명을 입력해주세요!",
  }),
});

export async function uploadPost(formData: FormData) {
  const data = Object.fromEntries(formData);
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }
  const result = postSchema.safeParse(data);

  const { userId } = auth();
  if (!userId) throw new Error("User is not authenticated!");

  if (!result.success) {
    return result.error.flatten();
  } else {
    await prisma.post.create({
      data: {
        desc: result.data.desc,
        userId,
        img: result.data.photo,
      },
    });
  }
}
