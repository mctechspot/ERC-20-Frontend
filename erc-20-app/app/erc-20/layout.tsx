import Image from 'next/image'
import Header from "@/app/components/Navigation/Header"
import Footer from "@/app/components/Navigation/Footer"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`page-container`}>
      <Header />
      <div className={`page-content bg-purple-standard`}>
        {children}
      </div>
      <Footer />
    </div>
  )
}
