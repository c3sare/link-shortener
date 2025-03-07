import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next/types";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
	output: process.env.STANDALONE ? "standalone" : undefined,
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
	experimental: {
		//   reactCompiler: true,
		//   ppr: "incremental",
	},
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
