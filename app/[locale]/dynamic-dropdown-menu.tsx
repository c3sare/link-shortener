"use client";

import dynamic from "next/dynamic";

export const DropdownMenu = dynamic(
  () => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenu),
  { ssr: false }
);

export const DropdownMenuContent = dynamic(
  () =>
    import("@/components/ui/dropdown-menu").then(
      (mod) => mod.DropdownMenuContent
    ),
  { ssr: false }
);

export const DropdownMenuItem = dynamic(
  () =>
    import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuItem),
  { ssr: false }
);

export const DropdownMenuLabel = dynamic(
  () =>
    import("@/components/ui/dropdown-menu").then(
      (mod) => mod.DropdownMenuLabel
    ),
  { ssr: false }
);

export const DropdownMenuSeparator = dynamic(
  () =>
    import("@/components/ui/dropdown-menu").then(
      (mod) => mod.DropdownMenuSeparator
    ),
  { ssr: false }
);

export const DropdownMenuTrigger = dynamic(
  () =>
    import("@/components/ui/dropdown-menu").then(
      (mod) => mod.DropdownMenuTrigger
    ),
  { ssr: false }
);
