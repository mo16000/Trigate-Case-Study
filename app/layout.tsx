import type { Metadata } from 'next';
import './globals.css';
import SiteNav from '@/components/site-nav';

export const metadata: Metadata = {
  title: 'Trigate — UX Case Study',
  description:
    'How Trigate evolved from a WordPress MVP into a white-label innovation management SaaS serving 6,000+ startup users.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteNav />
        {children}
        <footer className="site-footer page-width">
          <a className="footer-brand" href="/">
            trigate.
          </a>
          <span>A four-year product design journey · 2021–2025</span>
          <a href="/#chapters">Explore the case study</a>
        </footer>
      </body>
    </html>
  );
}
