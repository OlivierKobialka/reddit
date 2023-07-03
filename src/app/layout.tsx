import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/Toaster";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Techni Reddit",
    description:
        "A Reddit made for Cheatsheets in TechniSchools built with Next.js and TypeScript.",
    themeColor: "#ffffff",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
    authModal,
}: {
    children: React.ReactNode;
    authModal: React.ReactNode;
}) {
    return (
        <html
            lang="pl"
            className={cn(
                "bg-white text-slate-900 antialiased light",
                inter.className
            )}
        >
            <body className="min-h-screen pt-12 bg-slate-50 antialiased">
                <Providers>
                    {/* @ts-expect-error server component */}
                    <Navbar />

                    {/* auth flow */}
                    {authModal}

                    <div className="container max-w-7xl mx-auto h-full pt-12">
                        {children}
                    </div>

                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
