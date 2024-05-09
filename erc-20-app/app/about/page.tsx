import Image from 'next/image'
import Header from "@/app/components/navigation/Header"
import Footer from "@/app/components/navigation/Footer"
import ERC20LogoSvg from "@/public/assets/erc-20-logo.svg"
import { GiTwoCoins } from "react-icons/gi";

export default function About() {
    return (
        <div className={`page-container`}>
            <Header />
            <div className={`page-content bg-purple-standard`}>
                <div className={`mx-[100px] my-[50px] text-white`}>
                    <p className={`text-gold-standard text-center font-bold text-4xl text-center`}>About EthereumTrove</p><br />
                    <Image
                        src={ERC20LogoSvg}
                        alt={"Logo"}
                        height={"200"}
                        width={"200"}
                        className={`block m-auto`}
                    /><br />

                    <p className={`text-center`}>EthereumTrove is an online platform that allows users to create, manage and transfer ERC-20 tokens.</p><br />
                    <p className={`text-center text-lg font-bold`}>What is ERC-20?</p>
                    <p className={`text-center`}>ERC-20 is a technical standard that allows digital management of fungible tokens on the blockchain.</p><br />
                    <div className={`flex justify-center items-center gap-2 max-[600px]:block`}>
                        <p className={`text-center text-3xl text-purple-mid font-black`}>BECOME THE CRYPTO MASTER!</p>
                        <div className={`flex justify-center items-center text-gold-standard text-center text-[50px]`}><GiTwoCoins /></div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}