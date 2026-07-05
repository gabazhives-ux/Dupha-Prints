import { clsx } from "clsx";

export default function GlassCard({
  children,
  className,
  dark = false,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={clsx(
        "rounded-3xl p-8 shadow-glass transition-transform duration-500 hover:-translate-y-1",
        dark ? "glass-dark" : "glass",
        className
      )}
    >
      {children}
    </div>
  );
}
