import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Portfolio - Full Stack Developer',
  description: 'Modern portfolio showcasing full-stack development expertise with 3D graphics and interactive experiences',
  keywords: ['portfolio', 'full-stack', 'developer', 'react', 'nextjs', 'three.js'],
  authors: [{ name: 'Your Name' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Portfolio - Full Stack Developer',
    description: 'Modern portfolio showcasing full-stack development expertise',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - Full Stack Developer',
    description: 'Modern portfolio showcasing full-stack development expertise',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'var(--background)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              },
            }}
          />
        </ThemeProvider>
        
        {/* Reveal Animation Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Intersection Observer for reveal animations
              const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
              };

              const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                  }
                });
              }, observerOptions);

              // Observe all reveal elements when DOM is loaded
              document.addEventListener('DOMContentLoaded', () => {
                document.querySelectorAll('.reveal-element').forEach(el => {
                  observer.observe(el);
                });
              });
            `
          }}
        />
      </body>
    </html>
  )
}