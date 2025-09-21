import { cn } from "@/lib/utils";
import type { ReactNode, JSX } from "react";

type EmptyCardProps = {
  length?: number;
  isLoading?: boolean;
  children?: ReactNode;
};

export default function EmptyCards({
  length = 5,
  isLoading = false,
  children,
}: EmptyCardProps): JSX.Element {
  return (
    <div className="relative pt-4">
      <div className="relative">
        <div className="grid grid-cols-2 gap-x-4 md:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length }).map((_, index) => (
            <div
              className={cn(
                "aspect-square rounded-t-md border border-dashed bg-white dark:bg-secondary",
                isLoading ? "animate-pulse" : null,
                index + 1 > 2 ? "max-md:hidden" : null,
                index + 1 > 3 ? "max-xl:hidden" : null
              )}
              key={index}
            />
          ))}
        </div>

        <div className="absolute inset-y-0 w-full bg-gradient-to-b from-transparent to-zinc-50 dark:to-background" />
      </div>

      {children}
    </div>
  );
}
