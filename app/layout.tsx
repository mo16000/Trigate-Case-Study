import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trigate — UX Case Study',
  description: 'How Trigate evolved from a WordPress MVP into a white-label innovation management SaaS serving 6,000+ startup users.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
