import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/db";
import { PostWithAuthor } from "~/db/schema";

export default async (_req: NextApiRequest, res: NextApiResponse<PostWithAuthor[]>) => {
  const items = await db.query.posts.findMany({
    with: {
      author: true,
    },
  });
  res.json(items);
};
