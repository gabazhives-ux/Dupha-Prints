import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import { business } from "@/lib/site-data";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://duphaprints.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dupha Prints — Premium Printing & Branding, Lekki, Lagos",
    template: "%s | Dupha Prints",
  },
  description:
    "Dupha Prints delivers digital, offset, and large-format printing, apparel, and corporate gifting from Lekki, Lagos — enquiries open 24 hours, Monday to Saturday.",
  keywords: [
    "printing Lagos",
    "printing Lekki",
    "large format printing",
    "banner printing Lagos",
    "corporate gifts Lagos",
    "t-shirt printing Lagos",
    "Dupha Prints",
  ],
  icons: {
    icon: [
      { url: "/images/logo.png", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/images/logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "Dupha Prints",
    title: "Dupha Prints — Premium Printing & Branding",
    description:
      "Digital, offset, and large-format printing, apparel, and corporate gifting — produced in Lekki, Lagos.",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Dupha Prints — Premium Printing & Branding, Lekki Lagos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dupha Prints — Premium Printing & Branding",
    description:
      "Digital, offset, and large-format printing, apparel, and corporate gifting — produced in Lekki, Lagos.",
    images: ["/images/og-cover.jpg"],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.name,
  image: `${siteUrl}/images/og-cover.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address,
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  telephone: business.phone,
  url: siteUrl,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  sameAs: [
    business.social.facebook,
    business.social.linkedin,
    business.social.instagram,
    business.social.tiktok,
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>

        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');`}
            </Script>
          </>
        )}

        {clarityId && (
          <Script id="clarity-init" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");`}
          </Script>
        )}
      </body>
    </html>
  );
}
