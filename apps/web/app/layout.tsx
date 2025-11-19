import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@peaks/ui/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Peaks - Coach Dashboard",
    description: "Advanced training platform for coaches and athletes",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
