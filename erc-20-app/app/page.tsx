import Image from 'next/image'
import Link from "next/link"
import Header from "@/app/components/Navigation/Header"
import Footer from "@/app/components/Navigation/Footer"
import ERC20LogoSvg from "@/public/assets/erc-20-logo.svg"
import BannerGIF from "@/public/assets/banner.gif"


export default function Home() {
  return (
    <div className={`bg-purple-standard flex justify-center items-center h-screen`}>
      <div>
        <p className={`text-center text-gold-standard text-4xl font-bold`}>EthereumTrove</p><br />
        <Image
          src={BannerGIF}
          alt={"Logo"}
          height={"300"}
          width={"300"}
          className={`w-auto`}
        /><br /><br />

        <Link href={"/erc-20"}
          className={`block m-auto bg-gold-standard text-center text-purple-standard text-2xl \
          font-bold p-4 rounded w-[250px]`}>
          Go
        </Link>
      </div>
    </div>
  )
}
