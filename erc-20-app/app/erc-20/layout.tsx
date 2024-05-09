import Image from 'next/image'
import Header from "@/app/components/navigation/Header"
import Footer from "@/app/components/navigation/Footer"

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
