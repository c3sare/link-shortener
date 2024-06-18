import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import lz from "lzutf8";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function compressUrl(url: string) {
  return lz.encodeBase64(lz.compress(url));
}

export function decompressUrl(compressedUrl: string) {
  return lz.decompress(lz.decodeBase64(compressedUrl));
}
