export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-950">
      <div className="flex items-center gap-3">
        <span className="h-2 w-2 animate-pulse rounded-full bg-cyan [animation-delay:-0.3s]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-press-red [animation-delay:-0.15s]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-paper" />
      </div>
    </div>
  );
}
