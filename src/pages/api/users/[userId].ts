import { eq } from 'drizzle-orm'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '~/db'
import { User, users } from '~/db/schema'

export default async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId } = req.query || 0

  const userIdNum = Number(userId)

  const user = await db.query.users.findFirst({
    where: eq(users.id, userIdNum)
  })
  if (!user) {
    throw new Error('Invalid user')
  }
  res.json(user)
}
