import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DJ Request App',
  description: 'Private song request app for DJs'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
