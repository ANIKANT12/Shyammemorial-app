import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Shyam Memorial Public School (DSMPS) | Haflaganj, Katihar",
  description: "Official portal of Dr. Shyam Memorial Public School, Haflaganj, Katihar (Bihar). Nursery to Class 10th CBSE Curriculum. Day-to-Day Activities, Notice Board, Faculty Meetings & Admissions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className="min-h-full flex flex-col antialiased text-slate-800 bg-slate-50 selection:bg-blue-100 selection:text-blue-900"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
