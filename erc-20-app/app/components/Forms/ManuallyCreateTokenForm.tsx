import Image from "next/image"
import Link from "next/link"
import ERC20LogoPng from "@/public/assets/erc-20-logo.png"
import ERC20LogoSvg from "@/public/assets/erc-20-logo.svg"
import { BiSolidCoinStack } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { GiTwoCoins } from "react-icons/gi";
import { MdOutlineTitle } from "react-icons/md";
import { TbDecimal } from "react-icons/tb";
import { ManuallyCreatedToken } from "@/app/types/Token"

export default function ManuallyCreateTokenForm({ 
    creatingToken, setCreatingToken, tokenContent, setTokenContent 
}: ManuallyCreatedToken) {

    const createToken = (event: any) => {
        event.preventDefault();
    };

    return (
        <>
            <div className={``}>
                <form method={"POST"} onSubmit={(event) => createToken(event)}>

                    {/* Token Symbol */}
                    <div className={`flex items-center gap-2 border border-solid border-purple-mid rounded p-2 `}>
                        <div className={`text-purple-mid`}><MdOutlineTitle /></div>
                        <input type={"text"} placeholder={"Token Name"}
                            className={`bg-transparent outline-none placeholder:text-purple-mid w-full`}
                            onChange={(event) => setTokenContent({ ...tokenContent, name: event.target.value })} />
                    </div><br />

                    {/* Token Name */}
                    <div className={`flex items-center gap-2 border border-solid border-purple-mid rounded p-2 `}>
                        <div className={`text-purple-mid`}><GiTwoCoins /></div>
                        <input type={"text"} placeholder={"Token Symbol"}
                            className={`bg-transparent outline-none placeholder:text-purple-mid w-full`}
                            onChange={(event) => setTokenContent({ ...tokenContent, symbol: event.target.value })} />
                    </div><br />

                    {/* Token Decimal Points */}
                    {/*<div className={`flex items-center gap-2 border border-solid border-purple-mid rounded p-2 `}>
                        <div className={`text-purple-mid`}><TbDecimal /></div>
                        <input type={"number"} placeholder={"Token Decimal Points. E.g., 1"} min={1} max={5}
                             className={`bg-transparent outline-none placeholder:text-purple-mid w-full`} 
                             onChange={(event) => setTokenContent({...tokenContent, decimal: event.target.value})}/>
                    </div><br />*/}

                    <button type={"submit"} className={`bg-gold-standard text-white text-center p-2 rounded w-full`}>Create Token</button>

                </form>

            </div>
        </>
    );
};