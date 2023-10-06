import { InferSelectModel, relations } from 'drizzle-orm'
import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name')
})
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts)
}))
export type User = InferSelectModel<typeof users>
export type UserWithPosts = User & { posts: Post[] }

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  content: text('content')
})
export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id]
  })
}))
export type Post = InferSelectModel<typeof posts>
export type PostWithAuthor = Post & { author: User }

export const likes = pgTable('likes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  postId: integer('post_id').notNull()
})

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
