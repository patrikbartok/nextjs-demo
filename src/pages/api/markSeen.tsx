import { db } from '~/db'
import { seenPosts } from '~/db/schema'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { userId, postId } = req.body
      await db.insert(seenPosts).values({ userId, postId })
      res.status(200).json({ message: 'Like added successfully' })
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
}
