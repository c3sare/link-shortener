import createNextIntlPlugin from "next-intl/plugin";
import { NextConfig } from "next/types";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  // experimental: {
  //   reactCompiler: true,
  //   ppr: "incremental",
  // },
};

export default withNextIntl(nextConfig);
