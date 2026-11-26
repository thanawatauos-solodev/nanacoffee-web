import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

/**
 * Root layout for the admin (/keystatic), separate from the public site's app/[lang] layout:
 * no site header, fonts or analytics, and kept out of search engines.
 */
export const metadata: Metadata = {
  title: "NaNa Coffee · จัดการเนื้อหา",
  robots: { index: false, follow: false },
};

export default function KeystaticLayout({ children }: LayoutProps<"/keystatic">) {
  return (
    <html lang="th">
      <body>
        <KeystaticApp />
        {/* Renders nothing (see page.tsx); kept so Next can still check the route. */}
        {children}
      </body>
    </html>
  );
}
