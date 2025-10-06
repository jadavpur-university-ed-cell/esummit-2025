import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Events | JU E-Summit 2025",
    description: "Explore various events at JU E-Summit 2025, from workshops to competitions, designed to inspire and engage aspiring entrepreneurs.",
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
