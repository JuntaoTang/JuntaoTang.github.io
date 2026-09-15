import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jun-Tao Tang',
  description: 'Jun-Tao Tang — undergraduate researcher working on multimodal learning and continual instruction tuning at Nanjing University.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
