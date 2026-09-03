import type { Metadata } from 'next';
import './globals.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Navbar } from '@/components/Navbar';
import { SmoothScroller } from '@/components/SmoothScroller';
import { MeshGradient } from '@/components/MeshGradient';
import { Analytics } from '@/components/Analytics';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { generateWebsiteSchema } from '@/lib/structured-data';
import { MotionProvider } from '@/components/MotionProvider';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  metadataBase: new URL('https://punn.site'),
  title: {
    default: 'ZENTYR | Developer Hub',
    template: '%s | ZENTYR',
  },
  description:
    'แหล่งรวมความรู้ ไอเดีย และเทคนิคต่างๆ สำหรับการพัฒนาเว็บไซต์ ซอฟต์แวร์ และเทคโนโลยี | Next.js, React, TypeScript',
  keywords: [
    'ZENTYR',
    'Developer Hub',
    'Web Development',
    'React',
    'Next.js',
    'TypeScript',
    'Programming',
    'นักพัฒนา',
    'เว็บไซต์',
  ],
  authors: [{ name: 'Satayu Pongpan', url: 'https://satayupongpan.site' }],
  creator: 'Satayu Pongpan',
  publisher: 'ZENTYR',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: 'https://punn.site',
    title: 'ZENTYR | Developer Hub',
    description: 'แหล่งรวมความรู้ ไอเดีย และเทคนิคต่างๆ สำหรับการพัฒนาเว็บไซต์และเทคโนโลยี',
    siteName: 'ZENTYR',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'ZENTYR Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZENTYR | Developer Hub',
    description: 'แหล่งรวมความรู้สำหรับนักพัฒนาและผู้สร้าง',
    images: ['/icon-512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://punn.site',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  verification: {
    // google: 'your-google-verification-code', // เพิ่มตอน deploy
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = generateWebsiteSchema();
  const isVercelDeployment = process.env.VERCEL === '1';

  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var a=localStorage.getItem('zentyr_auto_2time')==='true';var t=localStorage.getItem('zentyr_theme');var d='obsidian';if(a){var h=new Date().getHours();d=(h>=6&&h<18)?'sunset':'obsidian';}else if(t==='sunset'||t==='obsidian'){d=t;}if(d==='obsidian'){document.documentElement.classList.add('dark');}else{document.documentElement.classList.remove('dark');}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden font-sans antialiased">
        <div className="bg-grain" aria-hidden="true" />
        <a href="#main-content" className="skip-to-main">
          ข้ามไปยังเนื้อหาหลัก
        </a>
        <MotionProvider>
          <ThemeProvider>
            <MeshGradient />
            <SmoothScroller />
            <Navbar />
            <Analytics />
            {isVercelDeployment && (
              <>
                <VercelAnalytics />
                <SpeedInsights />
              </>
            )}
            <main id="main-content">
              <ErrorBoundary>{children}</ErrorBoundary>
            </main>
          </ThemeProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
