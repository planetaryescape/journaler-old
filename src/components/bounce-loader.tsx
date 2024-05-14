import { cn } from "@/lib/utils";

export default function BounceLoader({
  className,
  size = 5,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      <div
        className={cn(
          "size-5 animate-bounce rounded-full bg-[var(--brand-primary)] [animation-delay:-0.3s]",
          `size-${size}$`
        )}
      ></div>
      <div
        className={cn(
          "size-5 animate-bounce rounded-full bg-[var(--brand-primary)] [animation-delay:-0.13s]",
          `size-${size}$`
        )}
      ></div>
      <div
        className={cn(
          "size-5 animate-bounce rounded-full bg-[var(--brand-primary)]",
          `size-${size}$`
        )}
      ></div>
    </div>
  );
}
