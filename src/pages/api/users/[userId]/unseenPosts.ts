import { eq } from 'drizzle-orm'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '~/db'
import { likes, Post } from '~/db/schema'

export default async (req: NextApiRequest, res: NextApiResponse<Post[]>) => {
  const { userId } = req.query || 0

  const userIdNum = Number(userId)

  const posts = await db.query.posts.findMany({
    with: {
      author: true
    }
  })

  if (!posts) {
    throw new Error('Posts query failed')
  }

  const userLikes = await db.query.likes.findMany({
    where: eq(likes.userId, userIdNum)
  })

  if (!userLikes) {
    throw new Error('User likes query failed')
  }

  const unseensPosts = posts.filter((post) => !userLikes.some((like) => like.postId === post.id))

  console.log(unseensPosts)

  res.json(unseensPosts)
}
