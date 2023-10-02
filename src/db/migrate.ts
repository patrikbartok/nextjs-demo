import { posts, users } from "./schema";
import { faker } from "@faker-js/faker";
import { db } from ".";
import { migrate } from "drizzle-orm/postgres-js/migrator";

// update database schema
await migrate(db, {
  migrationsFolder: "src/db/migrations",
});

// seed database if it's empty
const NUMBER_OF_USERS = 20;
const NUMBER_OF_POSTS = 100;

const user = await db.query.users.findFirst();
if (!user) {
  for (let i = 1; i < NUMBER_OF_USERS + 1; i++) {
    await db.insert(users).values({ name: faker.person.firstName() });
  }

  for (let i = 1; i < NUMBER_OF_POSTS + 1; i++) {
    await db.insert(posts).values({
      userId: Math.floor(Math.random() * NUMBER_OF_USERS) + 1,
      content: faker.lorem.text(),
    });
  }
}

process.exit();
