// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"

const fontHeading = IBM_Plex_Mono({
  weight: '700',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = IBM_Plex_Mono({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})
//@ts-ignore
export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={fontHeading.variable + ' ' + fontBody.variable}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}