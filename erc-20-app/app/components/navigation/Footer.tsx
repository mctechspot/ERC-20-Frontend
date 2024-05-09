import Image from "next/image"
import Link from "next/link"
import ERC20LogoPng from "@/public/assets/erc-20-logo.png"
import ERC20LogoSvg from "@/public/assets/erc-20-logo.svg"


export default function Footer() {
    const startYear: number = 2024;
    return (
        <>
            <div className={`bg-purple-standard p-4 text-gold-standard text-center \
            flex justify-center items-center gap-2 border-t border-t-solid border-t-purple-mid`}>
                <p>&copy; {startYear} EthereumTrove</p>
                <span> | </span>
                <Link href={`/about`}>about</Link>
            </div>
        </>
    );
};