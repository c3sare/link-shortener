import { handlers } from "@/auth";

export const runtime = process.env.VERCEL_URL ? "edge" : "nodejs";

export const { GET, POST } = handlers;
