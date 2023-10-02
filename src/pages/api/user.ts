import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/db";
import { User, users } from "~/db/schema";

const LOGGED_IN_USER_ID = 1;

export default async (_req: NextApiRequest, res: NextApiResponse<User>) => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, LOGGED_IN_USER_ID),
  });
  if (!user) {
    throw new Error("Invalid user");
  }
  res.json(user);
};
