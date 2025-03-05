import type { AdapterAccountType } from "next-auth/adapters";

import { relations, sql } from "drizzle-orm";
import { pgTable, primaryKey } from "drizzle-orm/pg-core";

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

export const usersRelations = relations(users, ({ many }) => ({
  labels: many(labels),
  links: many(links),
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

export const links = pgTable("links", (t) => ({
  id: t.text("id").notNull().primaryKey(),
  userId: t.text("user_id").references(() => users.id, { onDelete: "cascade" }),
  url: t.text("url").notNull(),
  passcode: t.text("passcode"),
  title: t.text("title"),
  description: t.text("description"),
  createdAt: t
    .timestamp("created_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
}));

export const linksRelations = relations(links, ({ many, one }) => ({
  redirects: many(redirects),
  user: one(users, { fields: [links.userId], references: [users.id] }),
  labelLinks: many(labelsLinks),
}));

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

export const labelsRelations = relations(labels, ({ many, one }) => ({
  labelLinks: many(labelsLinks),
  user: one(users, { fields: [labels.userId], references: [users.id] }),
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

export const labelsLinksRelations = relations(labelsLinks, ({ one }) => ({
  link: one(links, { fields: [labelsLinks.linkId], references: [links.id] }),
  label: one(labels, {
    fields: [labelsLinks.labelId],
    references: [labels.id],
  }),
}));

export const redirectsRelations = relations(redirects, ({ one }) => ({
  link: one(links, { fields: [redirects.linkId], references: [links.id] }),
}));
