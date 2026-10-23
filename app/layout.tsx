import type { Metadata } from 'next';
import '@kishanscaler/ssx-ui/fonts.css';
import './globals.css';
import { RevealObserver } from '../components/motion/RevealObserver';
import { VariantSwitcher } from '../components/VariantSwitcher';

export const metadata: Metadata = {
  title: 'Scaler School of Business — PGP in Management & Tech',
  description:
    'A full-time, 18-month PGP in Management & Tech in Bangalore. Learn business hands-on from 100+ industry leaders.',
};

/* Marks the page as scripted, so scroll reveals may start hidden. */
const jsScript = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-brand="ssb" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsScript }} />
      </head>
      <body className="bg-surface font-sans text-content antialiased">
        {children}
        <VariantSwitcher />
        <RevealObserver />
      </body>
    </html>
  );
}
