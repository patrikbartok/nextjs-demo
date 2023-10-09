import { db } from '~/db'
import { likes } from '~/db/schema'
import { and, eq } from 'drizzle-orm'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userId, postId } = req.body
    const deletedUser = await db
      .delete(likes)
      .where(and(eq(likes.userId, userId), eq(likes.postId, postId)))
      .returning()

    if (deletedUser.length > 0) {
      res.status(200).json({ message: 'Like removed successfully' })
    } else {
      res.status(404).json({ message: 'Like was not found' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
