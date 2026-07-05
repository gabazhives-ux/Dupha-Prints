import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ColorBar from "@/components/ui/ColorBar";

export const metadata: Metadata = {
  title: "Blog & News",
  description: "Print tips, studio news, and behind-the-scenes updates from Dupha Prints.",
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    title: "Choosing the right paper stock for your next print run",
    excerpt: "Matte, gloss, or uncoated — how paper choice changes the finished look and cost of your job.",
    date: "Coming soon",
  },
  {
    title: "Large format printing: what file resolution do you actually need?",
    excerpt: "A practical guide to preparing artwork for banners and billboards without blowing your budget.",
    date: "Coming soon",
  },
  {
    title: "Inside our production line: from proof to press",
    excerpt: "A look at the quality checks every job passes through before it leaves our Lekki studio.",
    date: "Coming soon",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-ink-950 pb-20 pt-40 sm:pt-48">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            eyebrow="Blog & News"
            title="Notes from the print floor."
            description="Articles are managed from the admin dashboard — this section is ready to populate."
            light
          />
        </div>
      </section>
      <ColorBar />

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="divide-y divide-ink-950/10 rounded-3xl border border-ink-950/8 bg-white/60">
            {posts.map((post) => (
              <article key={post.title} className="p-8">
                <span className="font-mono text-xs uppercase tracking-widest text-cyan-dark">{post.date}</span>
                <h2 className="mt-3 font-display text-2xl text-ink-950">{post.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-950/60">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
