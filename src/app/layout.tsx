import { Roboto } from "next/font/google";
import { PropsWithChildren } from "react";
import Navbar from "@/components/navbar/Navbar";
import Providers from "./providers";
import { getLocale, getMessages } from "next-intl/server";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata = {
  title: "☿ Mercuryou",
  description: "A modern astrology chart generator",
  keywords: ["astrology", "chart", "birth chart", "astral chart"],
  authors: [
    { name: "Rodrigo Souza", url: "https://github.com/ploissken/neo-venus" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },

  openGraph: {
    title: "Mercuryou",
    description: "Astrology modernized",
    url: "https://mercuryou.txto.com.br",
    siteName: "Mercuryou",
    images: [
      {
        url: "https://mercuryou.txto.com.br/screenshot.png",
        width: 1888,
        height: 912,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={roboto.variable}>
      <body>
        <Providers locale={locale} messages={messages}>
          <main>
            <Navbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
