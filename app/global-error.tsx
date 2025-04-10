"use client";

export default function GlobalError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <p className="text-lg font-semibold">500</p>
      <p className="mt-2 text-sm">Internal Server Error</p>
    </div>
  );
}
