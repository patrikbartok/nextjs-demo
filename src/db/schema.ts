import { InferSelectModel, relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

// https://orm.drizzle.team/docs/rqb#one-to-many

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
});
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));
export type User = InferSelectModel<typeof users>;
export type UserWithPosts = User & { posts: Post[] };

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  content: text("content"),
});
export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));
export type Post = InferSelectModel<typeof posts>;
export type PostWithAuthor = Post & { author: User };
