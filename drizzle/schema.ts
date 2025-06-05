import { relations, sql } from "drizzle-orm";
import { index, pgTable, primaryKey } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const users = pgTable("user", (t) => ({
  id: t
    .text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: t.text(),
  email: t.text().notNull(),
  emailVerified: t.timestamp("emailVerified", { mode: "date" }),
  image: t.text(),
  createdAt: t
    .timestamp({ mode: "date" })
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
    type: t.text().$type<AdapterAccountType>().notNull(),
    provider: t.text().notNull(),
    providerAccountId: t.text("providerAccountId").notNull(),
    refresh_token: t.text(),
    access_token: t.text(),
    expires_at: t.integer(),
    token_type: t.text(),
    scope: t.text(),
    id_token: t.text(),
    session_state: t.text(),
  }),
  (t) => [
    primaryKey({
      columns: [t.provider, t.providerAccountId],
    }),
  ],
);

export const sessions = pgTable("session", (t) => ({
  sessionToken: t.text("sessionToken").primaryKey(),
  userId: t
    .text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: t.timestamp({ mode: "date" }).notNull(),
}));

export const verificationTokens = pgTable(
  "verificationToken",
  (t) => ({
    identifier: t.text().notNull(),
    token: t.text().notNull(),
    expires: t.timestamp({ mode: "date" }).notNull(),
  }),
  (t) => [primaryKey({ columns: [t.identifier, t.token] })],
);

export const authenticators = pgTable(
  "authenticator",
  (t) => ({
    credentialID: t.text("credentialID").notNull().unique(),
    userId: t
      .text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: t.text("providerAccountId").notNull(),
    credentialPublicKey: t.text("credentialPublicKey").notNull(),
    counter: t.integer("counter").notNull(),
    credentialDeviceType: t.text("credentialDeviceType").notNull(),
    credentialBackedUp: t.boolean("credentialBackedUp").notNull(),
    transports: t.text("transports"),
  }),
  (authenticator) => [
    {
      compositePK: primaryKey({
        columns: [authenticator.userId, authenticator.credentialID],
      }),
    },
  ],
);

export const links = pgTable(
  "links",
  (t) => ({
    id: t.text().notNull().primaryKey(),
    userId: t.text().references(() => users.id, { onDelete: "cascade" }),
    url: t.text().notNull(),
    passcode: t.text(),
    title: t.text(),
    description: t.text(),
    createdAt: t
      .timestamp({ mode: "date" })
      .notNull()
      .default(sql`now()`),
  }),
  (table) => [
    index("search_index").using(
      "gin",
      sql`(
          setweight(to_tsvector('english', ${table.title}), 'A') ||
          setweight(to_tsvector('english', ${table.description}), 'B')
      )`,
    ),
  ],
);

export const redirects = pgTable("redirects", (t) => ({
  id: t.serial().notNull().primaryKey(),
  linkId: t
    .text()
    .notNull()
    .references(() => links.id, { onDelete: "cascade" }),
  ip: t.text(),
  country: t.text(),
  city: t.text(),
  continent: t.text(),
  latitude: t.text(),
  timezone: t.text(),
  createdAt: t
    .timestamp({ mode: "date" })
    .notNull()
    .default(sql`now()`),
}));

export const labels = pgTable("labels", (t) => ({
  id: t.serial().notNull().primaryKey(),
  label: t.text().notNull(),
  userId: t
    .text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
}));

export const labelsLinks = pgTable(
  "labels_links",
  (t) => ({
    linkId: t
      .text()
      .notNull()
      .references(() => links.id, { onDelete: "cascade" }),
    labelId: t
      .integer()
      .notNull()
      .references(() => labels.id, { onDelete: "cascade" }),
  }),
  (t) => [primaryKey({ columns: [t.linkId, t.labelId] })],
);

export const usersRelations = relations(users, ({ many }) => ({
  labels: many(labels),
  links: many(links),
}));

export const linksRelations = relations(links, ({ many, one }) => ({
  redirects: many(redirects),
  user: one(users, { fields: [links.userId], references: [users.id] }),
  labelLinks: many(labelsLinks),
}));

export const labelsRelations = relations(labels, ({ many, one }) => ({
  labelLinks: many(labelsLinks),
  user: one(users, { fields: [labels.userId], references: [users.id] }),
}));

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
