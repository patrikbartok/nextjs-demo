import { eq } from 'drizzle-orm'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '~/db'
import { Post, seenPosts } from '~/db/schema'

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

  const seenPostsQuery = await db.query.seenPosts.findMany({
    where: eq(seenPosts.userId, userIdNum)
  })

  if (!seenPostsQuery) {
    throw new Error('User unseen posts query failed')
  }

  const unseensPosts = posts.filter((post) => !seenPostsQuery.some((like) => like.postId === post.id))

  res.json(unseensPosts)
}
