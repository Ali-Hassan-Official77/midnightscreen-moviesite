import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const runtime = 'edge';
export const metadata = {
  title: "MidnightScreen — Cinema After Dark",
  description:
    "Discover cinema that stays with you. A premium movie and series discovery experience — streaming quality, curated taste.",
  keywords: ["movies", "web series", "streaming", "cinema", "film discovery"],
  icons: { icon: "./icon.svg" },
  openGraph: {
    title: "MidnightScreen",
    description: "Cinema after dark. Premium movie discovery.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased bg-[#0a0a0f] text-[#f5f0e8] selection:bg-amber-300/30 selection:text-amber-50 overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}