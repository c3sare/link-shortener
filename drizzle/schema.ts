import { relations, sql } from "drizzle-orm";
import { index, pgTable, primaryKey } from "drizzle-orm/pg-core";

export const user = pgTable("user", (t) => ({
  id: t
    .text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: t.text(),
  email: t.text().notNull(),
  emailVerified: t.boolean().notNull().default(false),
  image: t.text(),
  createdAt: t.timestamp({ mode: "date" }).notNull().default(sql`now()`),
  updatedAt: t
    .timestamp({ mode: "date", precision: 3 })
    .$onUpdate(() => new Date()),
}));

export const account = pgTable("account", (t) => ({
  id: t.text().primaryKey(),
  accountId: t.text().notNull(),
  providerId: t.text().notNull(),
  userId: t
    .text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: t.text(),
  refreshToken: t.text(),
  idToken: t.text(),
  accessTokenExpiresAt: t.timestamp(),
  refreshTokenExpiresAt: t.timestamp(),
  scope: t.text(),
  password: t.text(),
  createdAt: t.timestamp().notNull().defaultNow(),
  updatedAt: t
    .timestamp({ mode: "date", precision: 3 })
    .$onUpdate(() => new Date()),
}));

export const session = pgTable("session", (t) => ({
  id: t.text().primaryKey(),
  expiresAt: t.timestamp().notNull(),
  token: t.text().notNull().unique(),
  createdAt: t.timestamp().notNull(),
  updatedAt: t.timestamp().notNull(),
  ipAddress: t.text(),
  userAgent: t.text(),
  userId: t
    .text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
}));

export const verification = pgTable("verification", (t) => ({
  id: t.text().primaryKey(),
  identifier: t.text().notNull(),
  value: t.text().notNull(),
  expiresAt: t.timestamp().notNull(),
  createdAt: t.timestamp().notNull().defaultNow(),
  updatedAt: t
    .timestamp({ mode: "date", precision: 3 })
    .$onUpdate(() => new Date()),
}));

export const links = pgTable(
  "links",
  (t) => ({
    id: t.text().notNull().primaryKey(),
    userId: t.text().references(() => user.id, { onDelete: "cascade" }),
    url: t.text().notNull(),
    passcode: t.text(),
    title: t.text(),
    description: t.text(),
    createdAt: t.timestamp({ mode: "date" }).notNull().default(sql`now()`),
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
  createdAt: t.timestamp({ mode: "date" }).notNull().default(sql`now()`),
}));

export const labels = pgTable("labels", (t) => ({
  id: t.serial().notNull().primaryKey(),
  label: t.text().notNull(),
  userId: t
    .text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
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

export const usersRelations = relations(user, ({ many }) => ({
  labels: many(labels),
  links: many(links),
}));

export const linksRelations = relations(links, ({ many, one }) => ({
  redirects: many(redirects),
  user: one(user, { fields: [links.userId], references: [user.id] }),
  labelLinks: many(labelsLinks),
}));

export const labelsRelations = relations(labels, ({ many, one }) => ({
  labelLinks: many(labelsLinks),
  user: one(user, { fields: [labels.userId], references: [user.id] }),
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
