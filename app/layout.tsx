import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema Chiphone",
  description: "Sistema de gestión comercial",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          bg-[#0B1220]
          text-white
        `}
      >
        <div className="min-h-screen flex">
          {/* SIDEBAR */}
          <Sidebar />

          {/* CONTENIDO */}
          <main className="flex-1 p-4 md:p-6 lg:p-8 bg-[#0B1220]">
            {children}
          </main>
        </div>

        {/* TOAST GLOBAL */}
        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            classNames: {
              toast:
                "bg-[#0F172A] text-white border border-slate-800 shadow-lg",
              description: "text-slate-300",
              actionButton:
                "bg-blue-600 hover:bg-blue-700 text-white",
              cancelButton:
                "bg-slate-700 hover:bg-slate-600 text-white",
            },
          }}
        />
      </body>
    </html>
  );
}
