import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

export const metadata = {
    title: "Techni-Reddit",
    description:
        "A Reddit made for Cheatsheets in TechniSchools built with Next.js and TypeScript.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="pl"
            className={cn(
                "bg-white text-slate-900 antialiased light",
                inter.className
            )}
        >
            <body>{children}</body>
        </html>
    );
}
