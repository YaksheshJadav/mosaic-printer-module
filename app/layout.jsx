import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = { title: "MOSAIC – 3D Printing System" };

/**
 * Inline blocking script – runs synchronously BEFORE first paint.
 * Reads localStorage, resolves the theme, and applies the correct
 * class + CSS variables on <html> so body/bg are always themed.
 * DEFAULT = "light" (no localStorage entry → light).
 */
const themeInitScript = `(function(){
  try {
    var stored = localStorage.getItem('mosaic_theme_preference');
    var dark = false;
    if (stored === 'dark') {
      dark = true;
    } else if (stored === 'system') {
      dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    // Default: light
    if (dark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
  } catch(e) {}
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking theme script MUST be the very first thing inside <head> */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}