"use server";

import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";

export async function saveMessage(payload: string, chatRoomId: string) {
  const { userId } = auth();
  const message = await prisma.message.create({
    data: {
      payload,
      chatRoomId,
      userId: userId!,
    },
    select: { id: true },
  });
  return message;
}
