import { ChartConfig } from "@/components/ui/chart";

type Item<T> = T & {
	createdAt: Date;
};

export const groupByDate = <T>(arr: Item<T>[]) => {
	const obj: Record<string, { redirects: number }> = {};

	arr.forEach((item) => {
		const date = item.createdAt.toISOString().split("T")[0];

		if (!obj[date]) obj[date] = { redirects: 1 };
		else obj[date].redirects++;
	});

	return Object.keys(obj).map((item) => ({
		date: item,
		redirects: obj[item].redirects,
	}));
};

export const chartDateConfig = (data: ReturnType<typeof groupByDate>) => {
	const colors = [
		"#FF6B6B",
		"#4ECDC4",
		"#45B7D1",
		"#FFA07A",
		"#98D8C8",
		"#F7DC6F",
		"#BB8FCE",
		"#82E0AA",
		"#F1948A",
		"#85C1E9",
		"#F8C471",
		"#73C6B6",
		"#D7BDE2",
		"#F0B27A",
		"#7DCEA0",
		"#5DADE2",
		"#F4D03F",
		"#EB984E",
		"#A569BD",
		"#45B39D",
	];

	const newData: Record<
		string,
		{
			label: string;
			color: string;
		}
	> = {};

	data.forEach((key, i) => {
		newData[key.date] = {
			label: key.date,
			color: colors[i] ?? "#000000",
		};
	});

	return newData as ChartConfig;
};
