import { eq } from 'drizzle-orm'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '~/db'
import { likes, PostWithAuthorAndLikedStatus, seenPosts } from '~/db/schema'

export default async (req: NextApiRequest, res: NextApiResponse<PostWithAuthorAndLikedStatus[]>) => {
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

  const userLikes = await db.query.likes.findMany({
    where: eq(likes.userId, userIdNum)
  })

  const unseenPosts = posts.filter((post) => !seenPostsQuery.some((like) => like.postId === post.id))

  const unseenPostsWithLikedStatus = unseenPosts.map((post) => ({
    ...post,
    liked: userLikes.some((like) => like.postId === post.id)
  }))

  res.json(unseenPostsWithLikedStatus)
}
