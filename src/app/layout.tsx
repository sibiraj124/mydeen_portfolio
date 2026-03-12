import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mydheen | Full Stack Developer",
  description:
    "Mohammed Mydheen – Full Stack Developer specializing in React, Next.js, Node.js and modern web technologies.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Node.js", "Portfolio"],
  authors: [{ name: "Mohammed Mydheen" }],
  openGraph: {
    title: "Mydheen | Full Stack Developer",
    description: "Full Stack Developer Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&family=Fira+Code:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
