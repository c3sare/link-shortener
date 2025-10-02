import { toNextJsHandler } from "better-auth/next-js";
import { ba } from "@/auth";

export const { POST, GET } = toNextJsHandler(ba);
