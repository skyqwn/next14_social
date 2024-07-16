import { z } from "zod";

export const postSchema = z.object({
  photo: z.string(),
  desc: z.string({
    required_error: "설명을 입력해주세요!",
  }),
});

export type PostType = z.infer<typeof postSchema>;
