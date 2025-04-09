import "./globals.css";

import { Suspense } from "react";

export const runtime = "edge";

// export const experimental_ppr = true;

export default function RootLayout({ children }: React.PropsWithChildren) {
  return <Suspense fallback={null}>{children}</Suspense>;
}
