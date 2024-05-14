"use client"
import { useEffect, useState } from "react"
import Image from 'next/image'
import Link from 'next/link'
import Header from "@/app/components/Navigation/Header"
import Footer from "@/app/components/Navigation/Footer"
import Web3 from 'web3';
import { ethers } from 'ethers'
//import type { MetaMaskInpageProvider } from "@metamask/providers";
/// <reference types="react-scripts" />
import { ExternalProvider } from "@ethersproject/providers";
import MetaMaskLogo from "@/public/assets/metamask.png"
import ManuallyCreateTokenForm from "@/app/components/Forms/ManuallyCreateTokenForm"
import GenAICreateTokenForm from "@/app/components/Forms/GenAICreateTokenForm"
import LoadSpinner from "@/app/components/Loaders/LoadSpinner"
import { GeneratedToken, GeneratedTokenSuccess, GeneratedTokenError } from "@/app/types/Token"

declare global {
    interface Window {
        ethereum?: any;
    }
}

export default function ERC20Home() {

    const [metamaskDefined, setMetamaskDefined] = useState<string | null | undefined>(null);
    const [accounts, setAccounts] = useState<string[] | null>(null);

    const [accountsDetails, setAccountsDetails] = useState<any>(null);
    const [manualTokenCreation, setManualTokenCreation] = useState<boolean>(true);
    const [tokenCreationText, setTokenCreationText] = useState<string>("Create a token manually.");
    const [generatingToken, setGeneratingToken] = useState<boolean>(false);
    const [generatedToken, setGeneratedToken] = useState<GeneratedTokenSuccess | GeneratedTokenError | null>(null);
    const [tokenContent, setTokenContent] = useState<any>({
        "name": "",
        "symbol": "",
        "decimal": 2,
        "image": null
    });
    const [creatingToken, setCreatingToken] = useState<boolean>(false);

    useEffect(() => {
        connectToMetamask();
    }, []);

    useEffect(() => {
        if (manualTokenCreation) {
            setTokenCreationText("Create a token manually.")
        } else {
            setTokenCreationText("Create a token with Generative AI.")
        }
    }, [manualTokenCreation]);

    // Function to initialise MetaMask connection
    const connectToMetamask = async () => {
        if (typeof window !== "undefined") {
            try {
                if (window.ethereum !== undefined) {
                    setMetamaskDefined("defined");
                    console.log("defined");
                } else {
                    setMetamaskDefined("undefined");
                    console.log("undefined");
                }
                const web3: any = new Web3(window.ethereum);

                console.log("web3: ", window.ethereum);
                await window.ethereum.enable();
                const accountsFound = await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log("accounts: ", accountsFound);
                if (accountsFound) {
                    setAccounts(accountsFound);
                }
                const accountDetails = await Promise.all(accountsFound.map(async (account: string, index: number) => {
                    let balance = await web3.eth.getBalance(account);
                    return {
                        "address": account,
                        "balance": web3.utils.fromWei(balance, 'ether')
                    };
                }));
                setAccountsDetails(accountDetails);
                console.log("account details: ", accountDetails);
            } catch (error: any) {
                console.log("error: ", error);
                if (error.message === 'User denied account authorization') {
                    console.log(`Metamask user account not authorized.`)
                    // handle the case where the user denied the connection request
                } else if (error.message === 'MetaMask is not enabled') {
                    // handle the case where MetaMask is not available
                    console.log(`Metamask not enabled`)
                } else {
                    // handle other errors
                }
            }
        }
    };

    return (
        <div className={`mx-[100px] my-[50px] text-white text-center`}>
            <p className={`text-2xl text-purple-mid`}>Hello, Cryptomaster!</p><br />

            <p className={`text-gold-standard text-xl font-bold text-center`}>Create a Token</p><br />

            <div className={`flex gap-2 items-center justify-center`}>
                <button className={`bg-gold-standard p-2 rounded ${manualTokenCreation ? ("text-purple-mid") : ("")}`}
                    onClick={() => setManualTokenCreation(true)}>
                    Manual
                </button>

                <button className={`bg-gold-standard p-2 rounded ${!manualTokenCreation ? ("text-purple-mid") : ("")}`}
                    onClick={() => setManualTokenCreation(false)}>
                    GenAI
                </button>
            </div><br />

            <p className={`text-gold-standard font-bold`}>{tokenCreationText}</p><br />

            {manualTokenCreation ? (
                <ManuallyCreateTokenForm
                    creatingToken={creatingToken}
                    setCreatingToken={setCreatingToken}
                    tokenContent={tokenContent}
                    setTokenContent={setTokenContent}
                />

            ) : (
                <GenAICreateTokenForm
                    generatingToken={generatingToken}
                    setGeneratingToken={setGeneratingToken}
                    generatedToken={generatedToken}
                    setGeneratedToken={setGeneratedToken}
                    creatingToken={creatingToken}
                    setCreatingToken={setCreatingToken}
                    tokenContent={tokenContent}
                    setTokenContent={setTokenContent}
                />
            )}
        </div >
    )
}
