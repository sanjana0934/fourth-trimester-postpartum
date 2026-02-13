import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Fourth Trimester | Care that doesn't clock out",
  description: "24/7 GenAI-powered support for mothers and their families.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased",
          inter.variable,
          playfair.variable
        )}
      >
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold text-primary-foreground">
                Fourth Trimester
              </span>
            </div>
            <nav className="flex items-center gap-6">
              <a href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
              <a href="/mother" className="text-sm font-medium hover:text-primary transition-colors">Mother Mode</a>
              <a href="/family" className="text-sm font-medium hover:text-primary transition-colors">Family Mode</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
