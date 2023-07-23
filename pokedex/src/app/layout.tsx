import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import QueryWrapper from './wrapper/QueryWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokedex',
  description: 'A pokedex app built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryWrapper>
        <body className={inter.className}>{children}</body>
      </QueryWrapper>
    </html>
  );
}
