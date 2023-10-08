import { eq } from 'drizzle-orm'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '~/db'
import { likes, Post } from '~/db/schema'

export default async (req: NextApiRequest, res: NextApiResponse<Post[]>) => {
  const { userId } = req.query || 0

  const userIdNum = Number(userId)

  const userLikes = await db.query.likes.findMany({
    where: eq(likes.userId, userIdNum),
    with: {
      post: {
        with: {
          author: true
        }
      }
    }
  })

  if (!userLikes) {
    throw new Error('User likes query failed')
  }

  const posts = userLikes.map((like) => like.post)

  res.json(posts)
}
