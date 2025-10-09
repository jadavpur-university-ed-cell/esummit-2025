import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "400", "600", "800"]
})

export const metadata: Metadata = {
  title: "E-Summit 2025 | JU E-Cell",
  description: "Jadavpur University Entrepreneurship Cell is about to host the 5th edition of it's flagship event, the E-Summit, including a plethora of events, workshops, and competitions.",
  metadataBase: new URL('https://esummit.juecell.com'),
  keywords: ['esummit', 'Jadavpur University', 'esummit kolkata', 'juecell', 'esummit ju', 'ju esummit', 'esummit juecell', 'juecell esummit', 'entrepreneuship', 'ju', 'shark tank', 'pitching', 'case study', 'product marketing', 'fest', 'ju-ecell', 'technology', 'events', 'games', 'coding', 'esummit24', 'techfest', 'ai', 'management', 'jadavpur university', 'kolkata', 'puja', 'durga puja'],
  authors: [{ name: ' JU E-Cell', url: 'https://esummit.juecell.com' }],
  creator: ' JU E-Cell',
  publisher: ' JU E-Cell',
  openGraph: {
    title: "E-Summit 2025 | JU E-Cell",
    description: "Stay Tuned! Jadavpur University Entrepreneurship Cell is about to host the 5th edition of it's flagship event, the E-Summit, including a plethora of events, workshops, and competitions.",
    url: 'https://esummit.juecell.com',
    siteName: "E-Summit 2025 | JU E-Cell",
    images: [
      {
        url: 'https://i.ibb.co/s9Gjf67Z/opengraph-image.webp',
        width: 1200,
        height: 640,
      },
    ],
    locale: 'en_US',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name='description'
          content="Stay Tuned! Jadavpur University Entrepreneurship Cell is about to host the 5th edition of it's flagship event, the E-Summit, including a plethora of events, workshops, and competitions."
        />
        <meta
          name='keywords'
          content=' E-Summit, entrepreneuship,esummit ju,ju esummit,esummit juecell,juecell esummit, ju,shark tank, pitching, case study,product marketing, fest, ju-ecell, technology, events, games, coding, esummit24, techfest, ai, management, jadavpur university,Kolkata, West Bengal,puja, durga puja'
        />
        <meta name='author' content='JU E-Cell' />

        <meta property='og:locale' content='en_US' />
        <meta property='og:type' content='article' />
        <meta
          property='og:title'
          content="E-Summit 2025 | JU E-Cell"
        />
        <meta
          property='og:description'
          content="Stay Tuned! Jadavpur University Entrepreneurship Cell is about to host the 5th edition of it's flagship event, the E-Summit, including a plethora of events, workshops, and competitions."
        />
        <meta property='og:url' content='https://esummit-24-taskforce141s-projects.vercel.app/' />
        <meta
          property='og:site_name'
          content="E-Summit 2025 | JU E-Cell"
        />
        <meta
          property="og:image"
          itemProp="image"
          content="/opengraph-image.webp"
        />
        <link
          rel='shortcut icon'
          href='favicon.ico'
          type='image/x-icon'
        />
        <link rel='icon' type='image/x-icon' href='favicon.ico' />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <SessionProvider >
          <Navbar />
          {children}
        </SessionProvider >
      </body>
    </html>
  );
}
