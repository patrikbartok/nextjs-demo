import { eq } from 'drizzle-orm'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '~/db'
import { Like, likes } from '~/db/schema'

export default async (req: NextApiRequest, res: NextApiResponse<Like[]>) => {
  const { userId } = req.query || 0

  const userIdNum = Number(userId)

  const userLikes = await db.query.likes.findMany({
    where: eq(likes.userId, userIdNum)
  })

  if (!userLikes) {
    throw new Error('User likes query failed')
  }
  res.json(userLikes)
}
