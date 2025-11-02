import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Workshops | JU E-Summit 2025",
    description: "Explore various workshops at JU E-Summit 2025, designed to inspire and engage aspiring entrepreneurs.",
    openGraph: {
        title: "Workshops | JU E-Summit 2025",
        description: "Explore various workshops at JU E-Summit 2025, designed to inspire and engage aspiring entrepreneurs.",
        url: "https://esummit.juecell.com/workshops",
        siteName: "JU E-Summit 2025",
        // images: [
        //     {
        //         url: "https://esummit.juecell.com/event-opengraph.webp",
        //         width: 1200,
        //         height: 640,
        //     },
        // ],
        locale: "en_US",
        type: "website",
    },
};
export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
