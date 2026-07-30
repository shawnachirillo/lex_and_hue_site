import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lex & Hue — Brand Reinvention Studio',
  description: 'Strategic brand reinvention for established businesses ready to evolve.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
