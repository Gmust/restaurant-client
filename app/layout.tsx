import './globals.css';

import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';

import { Footer } from '@/src/components/footer/Footer';
import { Header } from '@/src/components/header/Header';
import { Providers } from '@/src/components/shared/Providers';
import { cn } from '@/src/lib/utils';

const rubik = Rubik({ subsets: ['latin'], display: 'swap', variable: '--font-rubik' });

export const metadata: Metadata = {
  title: {
    default: 'Restaurant App',
    absolute: 'Restaurant App',
    template: '%s | Restaurant App',
  },
  description: 'Restaurant of national polish food',
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
    <body className={cn(rubik.className, 'bg-[#561C24] h-screen text-slate-200 static')}>
    <Providers>
      <Header />
      {children}
      <Footer />
    </Providers>
    </body>
    </html>
  );
}
