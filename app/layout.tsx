import type { Metadata } from 'next';
import { Archivo, Instrument_Serif } from 'next/font/google';

import './globals.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
  display: 'swap',
});
<head>
  <link rel="stylesheet" href="https://use.typekit.net/fpe7whe.css" />
</head>
export const metadata: Metadata = {
  title: {
    default: 'Lex & Hue — Design & Technology Co.',
    template: '%s | Lex & Hue',
  },
  description:
    'Lex & Hue designs how your business looks, feels, and operates through brand, experience, and systems.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-ink text-bone">
        <Header />

        <div className="pt-20">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}