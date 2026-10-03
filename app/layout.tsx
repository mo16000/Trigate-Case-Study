import type { Metadata } from 'next';
import './globals.css';
import SiteNav from '@/components/site-nav';
import { assetPath, pagePath } from '@/lib/site-path';

export const metadata: Metadata = {
  title: 'Trigate — UX Case Study',
  icons: { icon: assetPath('/favicon.svg') },
  description:
    'How Trigate evolved from a WordPress MVP into an innovation management platform serving 7,000+ startup ideas and 40+ innovation institutes across all 31 provinces of Iran.',
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
          <a
            className="footer-brand"
            href={pagePath('/')}
            aria-label="Trigate case study overview"
          >
            <img
              src={assetPath('/assets/Trigate-Logo-2.svg')}
              width={150}
              height={20}
              alt="Trigate"
            />
          </a>
          <span>A four-year product design journey · 2021–2025</span>
          <a href={pagePath('/#chapters')}>Explore the case study</a>
        </footer>
      </body>
    </html>
  );
}
