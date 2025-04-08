import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
export const metadata: Metadata = {
  title: {
    default: 'Web Store | E-Commerce Workshop',
    template: '%s | E-Commerce Woerkshop',
  },
  description: 'ร้านค้าออนไลน์อันดับ 1 สำหรับสินค้าไอทีครบวงจร พร้อบริการจัดส่งเร็วราคาคุ้มค่า',
}

//
interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout