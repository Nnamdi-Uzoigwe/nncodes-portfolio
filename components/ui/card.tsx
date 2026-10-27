import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type CardProps = ComponentProps<"div"> & {
  interactive?: boolean;
};

export function Card({ interactive, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card border border-border bg-card p-6",
        interactive &&
          "transition-colors duration-200 hover:border-foreground/30",
        className,
      )}
      {...props}
    />
  );
}