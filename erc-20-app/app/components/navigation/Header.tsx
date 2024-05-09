import Image from "next/image"
import Link from "next/link"
import ERC20LogoPng from "@/public/assets/erc-20-logo.png"
import ERC20LogoSvg from "@/public/assets/erc-20-logo.svg"
import { BiSolidCoinStack } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

export default function Header() {
    return (
        <>
            <div className={`bg-purple-standard p-4 border-b border-b-solid border-b-purple-mid`}>
                <div className={`flex gap-2 justify-between items-center`}>
                    <Link href={"/erc-20"} className={`flex items-center gap-2`}>
                        <Image
                            src={ERC20LogoSvg}
                            alt={"Logo"}
                            height={"40"}
                            width={"40"}
                        />
                        <p className={`text-gold-standard font-bold`}>EthereumTrove</p>
                    </Link>

                    <div className={`flex gap-4 items-center`}>
                        <button className={`text-purple-mid text-xl`}>
                            <BiSolidCoinStack />
                        </button>

                        <button className={`text-purple-mid text-xl`}>
                            <FaCirclePlus />
                        </button>

                        <button className={`text-purple-mid text-xl`}>
                            <FaUserAlt />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};