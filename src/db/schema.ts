import { InferSelectModel, relations } from 'drizzle-orm'
import { integer, pgTable, serial, text, unique } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name')
})
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  likes: many(likes)
}))
export type User = InferSelectModel<typeof users>
export type UserWithPosts = User & { posts: PostData[] }

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  content: text('content')
})
export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id]
  })
}))
export type PostData = InferSelectModel<typeof posts>
export type PostWithAuthorInfo = PostData & { author: User }
export type PostWithStatusInfo = PostWithAuthorInfo & { liked: boolean; seen: boolean }

export const likes = pgTable(
  'likes',
  {
    userId: integer('user_id').notNull(),
    postId: integer('post_id').notNull()
  },
  (t) => ({
    unq: unique().on(t.userId, t.postId)
  })
)

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id]
  }),
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id]
  })
}))
export type Like = InferSelectModel<typeof likes>

export const seenPosts = pgTable(
  'seen',
  {
    userId: integer('user_id').notNull(),
    postId: integer('post_id').notNull()
  },
  (t) => ({
    unq: unique().on(t.userId, t.postId)
  })
)

export const seenPostsRelations = relations(seenPosts, ({ one }) => ({
  user: one(users, {
    fields: [seenPosts.userId],
    references: [users.id]
  }),
  post: one(posts, {
    fields: [seenPosts.postId],
    references: [posts.id]
  })
}))
export type SeenPost = InferSelectModel<typeof seenPosts>
