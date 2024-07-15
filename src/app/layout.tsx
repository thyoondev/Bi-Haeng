import type { Metadata, Viewport } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { ThemeProvider } from "./provider/theme-provider";
import { ReactQueryProvider } from "./provider/react-query-provider";
import MainLayout from "./layouts/MainLayout";

const defaultFont = Roboto_Mono({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bi:Haeng",
  description: "A flight tracking application",
};

export const viewport: Viewport = {
  width: "device-width",
  minimumScale: 1,
  initialScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={defaultFont.className}>
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <MainLayout>{children}</MainLayout>
            </TooltipProvider>
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
