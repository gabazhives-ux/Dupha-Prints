import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://duphaprints.com";

  const routes = [
    "",
    "about",
    "services",
    "portfolio",
    "products",
    "industries",
    "partnership",
    "careers",
    "testimonials",
    "blog",
    "faq",
    "contact",
    "quote",
    "site-map",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
