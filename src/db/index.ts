import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { connectionString } from "~/../drizzle.config";

const connection = postgres(connectionString);

export const db = drizzle(connection, { schema });
