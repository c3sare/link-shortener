import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  users: {
    labels: r.many.labels({
      from: r.users.id,
      to: r.labels.userId,
    }),
    links: r.many.links({
      from: r.users.id,
      to: r.links.userId,
    }),
  },
  links: {
    redirects: r.many.redirects({
      from: r.links.id,
      to: r.redirects.linkId,
    }),
    labels: r.many.labels({
      from: r.links.id.through(r.labelsLinks.linkId),
      to: r.labels.id.through(r.labelsLinks.labelId),
    }),
  },
  labels: {
    labelLinks: r.many.labelsLinks({
      from: r.labels.id,
      to: r.labelsLinks.labelId,
    }),
  },
}));
