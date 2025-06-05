import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/themeProvider";
import ClientLayout from "@/components/ClientLayout";
import FabButton from '@/components/ui/FabButton';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "바른염색",

  icons: {
		icon: "/Image/mosayGkZ9W.jpeg",
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko"
     suppressHydrationWarning>
          <head>
        {/* Google Site Verification */}
        <meta name="google-site-verification" content="WgRQpOLPCOlz3Y3GtKWa4fStOYKiPjXODTJXxB5UffI" />
        {/* Naver Site Verification */}
        <meta name="naver-site-verification" content="4af5d4f4623d60780b89da37446b34a91e55f117" />
      </head>
      <body className={inter.className}>
      <ClientLayout>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
            <FabButton />
        </ClientLayout>
          </body>
    </html>
  );
}
