import { Skeleton } from "@/components/ui/skeleton";

export const CreateLinkFormSkeleton = () => (
	<div className="flex max-w-full flex-col gap-4">
		<div className="flex gap-2 flex-col sm:flex-row">
			<Skeleton className="h-10 w-full sm:flex-1" />
			<Skeleton style={{ minWidth: "71px" }} className="h-10 w-full md:w-20" />
		</div>
		<div
			className="w-full flex items-center gap-2 justify-center"
			style={{ height: "24px" }}
		>
			<Skeleton style={{ width: "44px" }} className="h-full rounded-full" />
			<Skeleton className="h-full" style={{ width: "200px" }} />
		</div>
	</div>
);
