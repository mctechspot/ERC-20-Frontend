"use client"
import Image from 'next/image'
import Link from 'next/link'
import Header from "@/app/components/navigation/Header"
import Footer from "@/app/components/navigation/Footer"
import ERC20LogoSvg from "@/public/assets/erc-20-logo.svg"

export default function Error() {
    return (
        <div className={`page-container`}>
            <Header />
            <div className={`page-content bg-purple-standard`}>
                <div className={`flex justify-center items-center h-full`}>
                    <div className={`text-white text-center text-lg`}>
                        <p>Oh no... An error occurred.</p><br />
                        <p>Let&apos;s get you back on track.</p><br />
                        <Link href={`/erc-20`}
                            className={`bg-purple-mid flex justify-center items-center gap-2 p-4 rounded`}>
                            <span>Home</span>
                            <Image
                                src={ERC20LogoSvg}
                                alt={"Logo"}
                                height={"20"}
                                width={"20"}
                                className={``}
                            />
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
