import prisma from "@/lib/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

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

const PostDetail = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);
  const post = await getPost(id);
  if (!post) {
    return notFound();
  }
  return (
    <div>
      <div className="relative aspect-square">
        <Image
          className="object-cover rounded-md"
          fill
          alt={post.id + ""}
          src={`${post.img}/public`}
        />
      </div>
    </div>
  );
};

export default PostDetail;
