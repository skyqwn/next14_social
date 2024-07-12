"use client";

import { useEffect, useRef, useState } from "react";
import { InitialPosts } from "./Feed";
import Post from "./Post";
import { getMorePosts } from "@/lib/actions";

interface PostListProps {
  initialPosts: InitialPosts;
}

const PostList = ({ initialPosts }: PostListProps) => {
  const [posts, setPosts] = useState(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newPosts = await getMorePosts(page + 1);
          if (newPosts.length !== 0) {
            setPage((prev) => prev + 1);
            setPosts((prev) => [...prev, ...newPosts]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      {
        threshold: 1.0,
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-12">
      {posts?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {isLastPage ? null : (
        <span
          ref={trigger}
          className="text-sm font-semibold w-fit mx-auto px-3 py-2 cursor-pointer rounded-md bg-slate-300"
        >
          {isLoading ? "가져오는중.." : "더가져오기"}
        </span>
      )}
    </div>
  );
};

export default PostList;
