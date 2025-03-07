"use client";

import * as schema from "@/drizzle/schema";
import { groupByDate } from "./utils/group-by-date";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "@/components/recharts";
import { useTranslations } from "next-intl";

type Props = {
	redirects: (typeof schema.redirects.$inferSelect)[];
};

export const DateChart = ({ redirects }: Props) => {
	const t = useTranslations();
	const data = groupByDate(redirects);

	const chartConfig = {
		redirects: {
			label: t("redirects"),
			color: "hsl(var(--chart-3))",
		},
	};

	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
			<BarChart accessibilityLayer data={data}>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="date"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
				/>
				<ChartTooltip content={<ChartTooltipContent />} />
				<Bar dataKey="redirects" fill={`hsl(var(--chart-3))`} radius={4} />
			</BarChart>
		</ChartContainer>
	);
};
