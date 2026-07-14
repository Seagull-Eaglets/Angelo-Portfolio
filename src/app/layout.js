import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://angeloconsulta-portfolio.vercel.app/'),
  title: "Angelo Consulta | Full-Stack Developer Portfolio",
  description: "Portfolio of Angelo Consulta, a full-stack developer specializing in modern web and cloud technologies. View projects, skills, testimonials, and contact information.",
  icons: {
    icon: '/Tech-Angelo-logo.png',
  },
  verification: {
    google: 'A9KEF2G0tuqglXx6Lm2bMjecO_LaxTYOIySye-aOQr0',
  },
  openGraph: {
    title: "Angelo Consulta | Full-Stack Developer Portfolio",
    description: "Portfolio of Angelo Consulta, a full-stack developer specializing in modern web and cloud technologies. View projects, skills, testimonials, and contact information.",
    url: "https://angeloconsulta-portfolio.vercel.app/",
    siteName: "Angelo Consulta Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 520,
        alt: "Angelo Consulta Profile Photo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Angelo Consulta | Full-Stack Developer Portfolio",
    description: "Portfolio of Angelo Consulta, a full-stack developer specializing in modern web and cloud technologies.",
    images: ["/profile.png"],
    creator: "@yourtwitterhandle"
  },
  alternates: {
    canonical: "https://angeloconsulta-portfolio.vercel.app/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
