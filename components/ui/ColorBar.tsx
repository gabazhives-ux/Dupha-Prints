import { clsx } from "clsx";

/**
 * The site's signature structural device: a CMYK "press check" strip,
 * the color bar printers run alongside a job to verify registration
 * and ink density before a print run is approved. Used here as a
 * section divider so it means something in this context, rather than
 * a decorative gradient rule.
 */
export default function ColorBar({ className }: { className?: string }) {
  return (
    <div className={clsx("color-bar", className)} aria-hidden="true">
      <span className="c" />
      <span className="m" />
      <span className="y" />
      <span className="k" />
    </div>
  );
}
