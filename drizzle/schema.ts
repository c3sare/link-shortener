import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  createdAt: timestamp("uploaded_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
});

export const usersRelations = relations(users, ({ many }) => ({
  labels: many(labels),
  links: many(links),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  ]
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })]
);

export const links = pgTable("links", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  passcode: text("passcode"),
  title: text("title"),
  description: text("description"),
  createdAt: timestamp("created_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
});

export const linksRelations = relations(links, ({ many, one }) => ({
  redirects: many(redirects),
  user: one(users, { fields: [links.userId], references: [users.id] }),
  labelLinks: many(labelsLinks),
}));

export const redirects = pgTable("redirects", {
  id: serial("id").notNull().primaryKey(),
  linkId: text("link_id")
    .notNull()
    .references(() => links.id, { onDelete: "cascade" }),
  ip: text("ip"),
  country: text("country"),
  city: text("city"),
  continent: text("continent"),
  latitude: text("latitude"),
  timezone: text("timezone"),
  createdAt: timestamp("created_at", { mode: "date" })
    .notNull()
    .default(sql`now()`),
});

export const labels = pgTable("labels", {
  id: serial("id").notNull().primaryKey(),
  label: text("label").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const labelsRelations = relations(labels, ({ many, one }) => ({
  labelLinks: many(labelsLinks),
  user: one(users, { fields: [labels.userId], references: [users.id] }),
}));

export const labelsLinks = pgTable(
  "labels_links",
  {
    linkId: text("link_id")
      .notNull()
      .references(() => links.id, { onDelete: "cascade" }),
    labelId: integer("label_id")
      .notNull()
      .references(() => labels.id, { onDelete: "cascade" }),
  },
  (ll) => [primaryKey({ columns: [ll.linkId, ll.labelId] })]
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
