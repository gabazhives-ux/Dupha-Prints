import { clsx } from "clsx";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
}: Props) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      {eyebrow && (
        <div
          className={clsx(
            "mb-4 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em]",
            align === "center" && "justify-center",
            light ? "text-cyan-light" : "text-cyan-dark"
          )}
        >
          <span className="registration-mark" />
          {eyebrow}
        </div>
      )}
      <h2
        className={clsx(
          "text-balance font-display text-4xl leading-[1.1] sm:text-5xl",
          light ? "text-paper" : "text-ink-950"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-5 text-lg leading-relaxed",
            light ? "text-paper/70" : "text-ink-950/65"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
