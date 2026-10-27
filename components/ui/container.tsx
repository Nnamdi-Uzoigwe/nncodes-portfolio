import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = ComponentProps<"div"> & {
  size?: "default" | "wide";
};

export function Container({
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6",
        size === "default" ? "max-w-3xl" : "max-w-5xl",
        className,
      )}
      {...props}
    />
  );
}