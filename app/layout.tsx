import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Head from "next/head"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "AICAL",
  description: "Advanced Calculator",
  icons: {
    icon: "/icon-512x512.png",
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="theme-color" content="#0f172a" />
        <link rel="icon" href="/icon-192x192.png" type="image/png" />
        
        {/* Optional: Other device icons */}
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="icon" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" sizes="16x16 32x32 48x48" href="/icon-192x192.png" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
