import { sql } from "drizzle-orm";
import { index, pgTable, primaryKey } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", (t) => ({
  id: t
    .text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: t.text("name"),
  email: t.text("email").notNull(),
  emailVerified: t.timestamp("emailVerified", { mode: "date" }),
  image: t.text("image"),
  createdAt: t
    .timestamp("uploaded_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
}));

export const accounts = pgTable(
  "account",
  (t) => ({
    userId: t
      .text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: t.text("type").$type<AdapterAccountType>().notNull(),
    provider: t.text("provider").notNull(),
    providerAccountId: t.text("providerAccountId").notNull(),
    refresh_token: t.text("refresh_token"),
    access_token: t.text("access_token"),
    expires_at: t.integer("expires_at"),
    token_type: t.text("token_type"),
    scope: t.text("scope"),
    id_token: t.text("id_token"),
    session_state: t.text("session_state"),
  }),
  (t) => [
    primaryKey({
      columns: [t.provider, t.providerAccountId],
    }),
  ]
);

export const sessions = pgTable("session", (t) => ({
  sessionToken: t.text("sessionToken").primaryKey(),
  userId: t
    .text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: t.timestamp("expires", { mode: "date" }).notNull(),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  (t) => ({
    identifier: t.text("identifier").notNull(),
    token: t.text("token").notNull(),
    expires: t.timestamp("expires", { mode: "date" }).notNull(),
  }),
  (t) => [primaryKey({ columns: [t.identifier, t.token] })]
);

export const links = pgTable(
  "links",
  (t) => ({
    id: t.text("id").notNull().primaryKey(),
    userId: t
      .text("user_id")
      .references(() => users.id, { onDelete: "cascade" }),
    url: t.text("url").notNull(),
    passcode: t.text("passcode"),
    title: t.text("title"),
    description: t.text("description"),
    createdAt: t
      .timestamp("created_at", { mode: "date" })
      .notNull()
      .default(sql`now()`),
  }),
  (table) => [
    index("search_index").using(
      "gin",
      sql`(
          setweight(to_tsvector('english', ${table.title}), 'A') ||
          setweight(to_tsvector('english', ${table.description}), 'B')
      )`
    ),
  ]
);

export const redirects = pgTable("redirects", (t) => ({
  id: t.serial("id").notNull().primaryKey(),
  linkId: t
    .text("link_id")
    .notNull()
    .references(() => links.id, { onDelete: "cascade" }),
  ip: t.text("ip"),
  country: t.text("country"),
  city: t.text("city"),
  continent: t.text("continent"),
  latitude: t.text("latitude"),
  timezone: t.text("timezone"),
  createdAt: t
    .timestamp("created_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
}));

export const labels = pgTable("labels", (t) => ({
  id: t.serial("id").notNull().primaryKey(),
  label: t.text("label").notNull(),
  userId: t
    .text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
}));

export const labelsLinks = pgTable(
  "labels_links",
  (t) => ({
    linkId: t
      .text("link_id")
      .notNull()
      .references(() => links.id, { onDelete: "cascade" }),
    labelId: t
      .integer("label_id")
      .notNull()
      .references(() => labels.id, { onDelete: "cascade" }),
  }),
  (t) => [primaryKey({ columns: [t.linkId, t.labelId] })]
);
