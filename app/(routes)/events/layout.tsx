import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Events | JU E-Summit 2025",
    description: "Explore various events at JU E-Summit 2025, from workshops to competitions, designed to inspire and engage aspiring entrepreneurs.",
    openGraph: {
        title: "Events | JU E-Summit 2025",
        description: "Explore various events at JU E-Summit 2025, from workshops to competitions, designed to inspire and engage aspiring entrepreneurs.",
        url: "https://esummit.juecell.com/events",
        siteName: "JU E-Summit 2025",
        images: [
            {
                url: "https://esummit.juecell.com/event-opengraph.webp",
                width: 1200,
                height: 640,
            },
        ],
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
