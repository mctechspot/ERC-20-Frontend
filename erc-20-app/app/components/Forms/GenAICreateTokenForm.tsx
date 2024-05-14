"use client"
import { useEffect, useState } from "react"
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
import { GeneratedToken } from "@/app/types/Token"
import LoadSpinner from "@/app/components/Loaders/LoadSpinner"

export default function GenAICreateTokenForm({
    generatingToken, setGeneratingToken, generatedToken, setGeneratedToken,
    creatingToken, setCreatingToken, tokenContent, setTokenContent
}: GeneratedToken) {

    const [prompt, setPrompt] = useState<string>("");

    /*const createToken = (event: any) => {
        event.preventDefault();
    };*/

    const generateToken = async (event: any) => {
        event.preventDefault();
        if (prompt.trim() !== "") {
            const payload = {
                "prompt": prompt
            };
            setGeneratedToken(null);
            setGeneratingToken(true);
            const generateTokenRes = await fetch(`/api/generate-token`, {
                "method": "POST",
                "body": JSON.stringify(payload)
            });
            const generateTokenJson = await generateTokenRes.json();
            setGeneratingToken(false);
            setGeneratedToken(generateTokenJson);
        }
    }

    const createToken = (generatedToken: any) => {
        setTokenContent(
            {
                ...tokenContent,
                name: generatedToken.name,
                symbol: generatedToken.symbol,
                image: generatedToken.image
            })
    };

    return (
        <>
            <div className={``}>
                <form method={"POST"} onSubmit={(event) => generateToken(event)}>

                    {/* Token Symbol */}
                    <textarea placeholder={"Prompt to generate token"}
                        className={`bg-transparent border border-solid border-purple-mid rounded \ 
                        p-2 outline-none placeholder:text-purple-mid min-h-[100px] resize-y w-full`}
                        onChange={(event) => setPrompt(event.target.value)}></textarea>
                    <br /><br />

                    <button type={"submit"} className={`bg-gold-standard text-white text-center p-2 rounded w-full`}
                        disabled={generatingToken}>
                        <div className={`flex gap-2 items-center justify-center`}>
                            <span>Generate Token Content</span>
                            {generatingToken ? (
                                <LoadSpinner colour={"white"} size={16} />
                            ) : ("")}
                        </div>
                    </button>

                    {generatedToken ? (
                        "error" in generatedToken ? (
                            <>
                                <br /><br />
                                <p>Error generating token. Try again.</p>
                            </>
                        ) : (
                            <>
                                <br /><br />
                                <p className={`text-center`}>Token Name: {generatedToken.response.name}</p>
                                <p className={`text-center`}>Token Symbol: {generatedToken.response.symbol}</p><br />
                                <Image
                                    src={generatedToken.response.image}
                                    alt={`${generatedToken.response.name} Image`}
                                    height={`200`}
                                    width={`200`}
                                    className={`bg-purple-md rounded block m-auto`}
                                /><br />
                                <p className={`text-center`}>If you like this content then, go ahead and create the token or regenerate the content.</p><br />
                                <button type={"button"} className={`bg-gold-standard text-white text-center p-2 rounded w-full`}
                                    disabled={creatingToken}
                                    onClick={() => createToken(generatedToken.response)}>
                                    <div className={`flex gap-2 items-center justify-center`}>
                                        <span>Create Content</span>
                                        {creatingToken ? (
                                            <LoadSpinner colour={"white"} size={16} />
                                        ) : ("")}
                                    </div>
                                </button>
                            </>
                        )
                    ) : ("")}

                </form>
            </div>
        </>
    );
};