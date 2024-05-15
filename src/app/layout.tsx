// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required

import { Libre_Franklin } from "next/font/google";
import "./globals.css";

const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre_franklin",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={libre_franklin.variable}>
        <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 px-4 py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
