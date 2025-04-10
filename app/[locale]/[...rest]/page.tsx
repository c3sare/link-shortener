import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "404",
  };
}

export default function PageNotFound() {
  return notFound();
}
