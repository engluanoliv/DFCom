import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type EmptyStateProps = {
  className?: string;
  emoji?: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export default function EmptyState({
  className,
  emoji = '🙂',
  title,
  description,
  children,
}: EmptyStateProps): JSX.Element {
  return (
    <div className={cn("flex justify-center rounded-md", className)}>
      <div className="max-w-2xl">
        <div className="grid space-y-4 p-4 text-center"><p className="text-4xl">{emoji}</p></div>
        <div className="grid space-y-1">
          <h1 className="font-medium text-foreground text-lg">{title}</h1>

          <p className="text-muted-foreground text-sm leading-6">
            {description}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
