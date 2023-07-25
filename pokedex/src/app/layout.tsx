import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import QueryWrapper from './wrapper/QueryWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  openGraph: {
    title: 'Pokedex',
    description: 'A pokedex app built with Next.js',
    url: 'hhttps://pokeapi.co/docs/v2',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'ko-kr',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryWrapper>
        <body className={inter.className}>
          {children}
          <div id="modal-root" />
        </body>
      </QueryWrapper>
    </html>
  );
}
