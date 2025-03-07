import { cn } from "@/lib/utils";

const Table = ({
	className,
	...props
}: React.ComponentPropsWithRef<"table">) => (
	<div className="relative w-full overflow-auto">
		<table
			className={cn("w-full caption-bottom text-sm", className)}
			{...props}
		/>
	</div>
);

const TableHeader = ({
	className,
	...props
}: React.ComponentPropsWithRef<"thead">) => (
	<thead className={cn("[&_tr]:border-b", className)} {...props} />
);

const TableBody = ({
	className,
	...props
}: React.ComponentPropsWithRef<"tbody">) => (
	<tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);

const TableFooter = ({
	className,
	...props
}: React.ComponentPropsWithRef<"tfoot">) => (
	<tfoot
		className={cn(
			"border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
			className,
		)}
		{...props}
	/>
);

const TableRow = ({
	className,
	...props
}: React.ComponentPropsWithRef<"tr">) => (
	<tr
		className={cn(
			"border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
			className,
		)}
		{...props}
	/>
);

const TableHead = ({
	className,
	...props
}: React.ComponentPropsWithRef<"th">) => (
	<th
		className={cn(
			"h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
			className,
		)}
		{...props}
	/>
);

const TableCell = ({
	className,
	...props
}: React.ComponentPropsWithRef<"td">) => (
	<td
		className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
		{...props}
	/>
);

const TableCaption = ({
	className,
	...props
}: React.ComponentPropsWithRef<"caption">) => (
	<caption
		className={cn("mt-4 text-sm text-muted-foreground", className)}
		{...props}
	/>
);

export {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
};
