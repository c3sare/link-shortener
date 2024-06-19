import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 mt-auto h-min flex items-center justify-center">
      <Loader className="animate-spin size-10" />
    </div>
  );
}
