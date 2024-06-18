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

const key = process.env.AUTH_SECRET ?? "";

export function encodeNumber(number: number) {
  number = number + 123456;
  const base = key.length;
  let encoded = "";
  while (number > 0) {
    encoded = key[number % base] + encoded;
    number = Math.floor(number / base);
  }
  return encoded;
}

export function decodeString(encoded: string) {
  const base = key.length;
  let number = 0;
  for (let i = 0; i < encoded.length; i++) {
    number = number * base + key.indexOf(encoded[i]);
  }
  return number - 123456;
}

export function compressUrl(url: string) {
  return lz.encodeBase64(lz.compress(url));
}

export function decompressUrl(compressedUrl: string) {
  return lz.decompress(lz.decodeBase64(compressedUrl));
}
