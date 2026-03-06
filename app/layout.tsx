import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Purcell Ventures — AI-Powered Digital Tools for Local Businesses",
  description:
    "Websites, booking systems, CRM, social media, and AI chatbots — custom-built and fully managed for your business. One monthly subscription. Cancel anytime.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='6' fill='%238B6914'/><text x='16' y='22' font-family='Georgia%2C serif' font-size='13' font-weight='700' fill='%23F5E6C8' text-anchor='middle'>PV</text></svg>"
        />
      </head>
      <body className={`${inter.variable} ${cinzel.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
