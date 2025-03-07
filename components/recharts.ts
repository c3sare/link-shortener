/* eslint-disable @typescript-eslint/no-require-imports */
import type {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	LegendProps,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const LineChartImpl: typeof LineChart =
	require("recharts/es6/chart/LineChart").LineChart;
const ResponsiveContainerImpl: typeof ResponsiveContainer =
	require("recharts/es6/component/ResponsiveContainer").ResponsiveContainer;
const XAxisImpl: typeof XAxis = require("recharts/es6/cartesian/XAxis").XAxis;
const YAxisImpl: typeof YAxis = require("recharts/es6/cartesian/YAxis").YAxis;
const TooltipImpl: typeof Tooltip =
	require("recharts/es6/component/Tooltip").Tooltip;
const CartesianGridImpl: typeof CartesianGrid =
	require("recharts/es6/cartesian/CartesianGrid").CartesianGrid;
const LineImpl: typeof Line = require("recharts/es6/cartesian/Line").Line;
const LegendImpl: typeof Legend =
	require("recharts/es6/component/Legend").Legend;
const BarImpl: typeof Bar = require("recharts/es6/cartesian/Bar").Bar;
const BarChartImpl: typeof BarChart =
	require("recharts/es6/chart/BarChart").BarChart;

export {
	BarImpl as Bar,
	BarChartImpl as BarChart,
	CartesianGridImpl as CartesianGrid,
	LegendImpl as Legend,
	type LegendProps,
	LineImpl as Line,
	LineChartImpl as LineChart,
	ResponsiveContainerImpl as ResponsiveContainer,
	TooltipImpl as Tooltip,
	XAxisImpl as XAxis,
	YAxisImpl as YAxis,
};
