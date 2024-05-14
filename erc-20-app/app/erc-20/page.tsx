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
import LoadSpinner from "@/app/components/Loaders/LoadSpinner"
import { SendTokenDetails } from "@/app/types/Token"
import { FaRegAddressBook } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import Dropdown from "@/app/components/Dropdown/Dropdown"

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function ERC20Home() {

  const [metamaskDefined, setMetamaskDefined] = useState<string | null | undefined>(null);
  const [accounts, setAccounts] = useState<string[] | null>(null);
  const [accountsDetails, setAccountsDetails] = useState<any>(null);
  const [currentAccount, setCurrentAccount] = useState<any>(null);
  const [accountsDropdownOptions, setAccountsDropdownOptions] = useState<any>(null);
  const [sendTokenDetails, setSendTokenDetails] = useState<SendTokenDetails>({
    "quantity": 0,
    "from": "",
    "to": ""
  });

  useEffect(() => {
    connectToMetamask();
    getMessage();
  }, []);

  // Function to initialise MetaMask connection
  const connectToMetamask = async () => {
    if (typeof window !== "undefined") {
      try {
        if (window.ethereum !== undefined) {
          setMetamaskDefined("defined");
        } else {
          setMetamaskDefined("undefined");
        }
        const web3: any = new Web3(window.ethereum);

        await window.ethereum.enable();
        const accountsFound = await window.ethereum.request({ method: 'eth_requestAccounts' });
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
        setCurrentAccount(accountDetails[0]);
        setAccountsDetails(accountDetails);
        const tempAccountDropdownOptions = accountsFound.map((account: string, index: number) => {
          return {
            "key": account,
            "value": account
          }
        });
        console.log("temp: ", tempAccountDropdownOptions);
        setAccountsDropdownOptions(tempAccountDropdownOptions);
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

  // Function to get balance for account address
  const getAccountAddressBalance = async (address: string) => {
    if (typeof window !== "undefined") {
      try {
        if (window.ethereum !== undefined) {
          return { "error": "Metamask not installed." };

        }
        const web3: any = new Web3(window.ethereum);
        let balance = await web3.eth.getBalance(address);
        balance = web3.utils.fromWei(balance, 'ether');
        return { "balance": balance };
      } catch (error: any) {
        console.log(`Error getting account address balance: ${error.message}.`);
        return { "error": error.message };
      }
    }
  }

  const getMessage = async () => {
    try {
      if (typeof window !== "undefined") {
        const web3 = new Web3(process.env.NEXT_PUBLIC_WEB3_ADDRESS);
        //const web3: any = new Web3(window.ethereum);
        //await window.ethereum.enable();
        console.log("cd: ", process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
        const contractABI = [
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "newMessage",
                "type": "string"
              }
            ],
            "name": "setMessage",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [],
            "name": "message",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ];
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const message = await contract.methods.message().call();
        console.log("MESSAGE: ", message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const sendTokens = async (event: any) => {
    event.preventDefault();
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const contractAddress = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS;
        const contractABI = [
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "approve",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "initialOwner",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
          },
          {
            "inputs": [],
            "name": "ECDSAInvalidSignature",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "length",
                "type": "uint256"
              }
            ],
            "name": "ECDSAInvalidSignatureLength",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              }
            ],
            "name": "ECDSAInvalidSignatureS",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "allowance",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
              }
            ],
            "name": "ERC20InsufficientAllowance",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "sender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
              }
            ],
            "name": "ERC20InsufficientBalance",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "approver",
                "type": "address"
              }
            ],
            "name": "ERC20InvalidApprover",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
              }
            ],
            "name": "ERC20InvalidReceiver",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "sender",
                "type": "address"
              }
            ],
            "name": "ERC20InvalidSender",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              }
            ],
            "name": "ERC20InvalidSpender",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              }
            ],
            "name": "ERC2612ExpiredSignature",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "signer",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "ERC2612InvalidSigner",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "currentNonce",
                "type": "uint256"
              }
            ],
            "name": "InvalidAccountNonce",
            "type": "error"
          },
          {
            "inputs": [],
            "name": "InvalidShortString",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "OwnableInvalidOwner",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "OwnableUnauthorizedAccount",
            "type": "error"
          },
          {
            "inputs": [
              {
                "internalType": "string",
                "name": "str",
                "type": "string"
              }
            ],
            "name": "StringTooLong",
            "type": "error"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "Approval",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [],
            "name": "EIP712DomainChanged",
            "type": "event"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
              },
              {
                "internalType": "uint8",
                "name": "v",
                "type": "uint8"
              },
              {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
              },
              {
                "internalType": "bytes32",
                "name": "s",
                "type": "bytes32"
              }
            ],
            "name": "permit",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "transfer",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "Transfer",
            "type": "event"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              }
            ],
            "name": "transferFrom",
            "outputs": [
              {
                "internalType": "bool",
                "name": "",
                "type": "bool"
              }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
              }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "spender",
                "type": "address"
              }
            ],
            "name": "allowance",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "account",
                "type": "address"
              }
            ],
            "name": "balanceOf",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "decimals",
            "outputs": [
              {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "DOMAIN_SEPARATOR",
            "outputs": [
              {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "eip712Domain",
            "outputs": [
              {
                "internalType": "bytes1",
                "name": "fields",
                "type": "bytes1"
              },
              {
                "internalType": "string",
                "name": "name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "version",
                "type": "string"
              },
              {
                "internalType": "uint256",
                "name": "chainId",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "verifyingContract",
                "type": "address"
              },
              {
                "internalType": "bytes32",
                "name": "salt",
                "type": "bytes32"
              },
              {
                "internalType": "uint256[]",
                "name": "extensions",
                "type": "uint256[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "name",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              }
            ],
            "name": "nonces",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "owner",
            "outputs": [
              {
                "internalType": "address",
                "name": "",
                "type": "address"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "symbol",
            "outputs": [
              {
                "internalType": "string",
                "name": "",
                "type": "string"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          },
          {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
              {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }
        ];
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();
        /*const accountAddress = accounts[0];
        const recipientAddress = accounts[1];*/
        const amountInWei = web3.utils.toWei(sendTokenDetails.quantity, 'ether');
        await web3.eth.sendTransaction({
          from: accounts[0],
          to: sendTokenDetails.to,
          value: amountInWei
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  }

  return (
    <div className={`mx-[100px] my-[50px] text-white`}>
      <p className={`text-2xl text-purple-mid`}>Hello, Cryptouser!</p><br />

      {metamaskDefined ? (
        <>
          {metamaskDefined === "defined" ? (
            <>
              {accounts ? (
                <>
                  {accounts && accounts.length > 0 ? (
                    <>
                      <p className={`text-purple-mid`}>MetaMask accounts</p>
                      <div>
                        {accounts.map((account: string, index: number) => {
                          return (
                            <p key={`metamask-account-${index + 1}`}>{account}</p>
                          );
                        })}
                      </div><br />

                      <p className={`text-purple-mid`}>Here are your tokens.</p>
                      <div>

                      </div><br />

                      <p className={`text-gold-standard`}>Send a token</p><br />
                      <div>
                        {accountsDropdownOptions ? (
                          <>
                            <form method={"POST"} onSubmit={(event) => sendTokens(event)}>
                              {/* Sender Address */}

                              <p className={`text-purple-mid`}>Current Account</p>
                              <Dropdown dropdownOptions={accountsDropdownOptions} /><br />

                              <p className={`text-purple-mid`}>Current account balance: <span className={`text-white`}>{currentAccount.balance} ETH</span></p><br />

                              {/* Token Amount */}
                              <div className={`flex items-center gap-2 border border-solid border-purple-mid rounded p-2 `}>
                                <div className={`text-purple-mid`}><GiTwoCoins /></div>
                                <input type={"number"} placeholder={"Token Amount"} min={1} max={100}
                                  className={`bg-transparent outline-none placeholder:text-purple-mid w-full`}
                                  onChange={(event) => setSendTokenDetails({ ...sendTokenDetails, quantity: parseInt(event.target.value) })} />
                              </div><br />


                              {/* Recipient Address Name */}
                              <div className={`flex items-center gap-2 border border-solid border-purple-mid rounded p-2 `}>
                                <div className={`text-purple-mid`}><FaRegAddressBook /></div>
                                <input type={"text"} placeholder={"Recipient Address"}
                                  className={`bg-transparent outline-none placeholder:text-purple-mid w-full`}
                                  onChange={(event) => setSendTokenDetails({ ...sendTokenDetails, to: event.target.value })} />
                              </div><br />

                              <button type={"submit"} className={`bg-gold-standard text-white text-center p-2 rounded w-full`}>Send Tokens</button>
                            </form>
                          </>
                        ) : ("")}

                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        className={`flex justify-center items-center gap-2 p-2 bg-purple-mid text-white rounded`}
                        onClick={() => connectToMetamask()}>
                        <span>Connect to Metamask</span>
                        <Image
                          src={MetaMaskLogo}
                          alt={"Logo"}
                          height={"20"}
                          width={"20"}
                        />
                      </button>
                    </>
                  )
                  }
                </>
              ) : ("")}
            </>
          ) : (
            <>
              <p className={`text-white text-center`}>You do not have MetaMask installed in your browser. Install it here <Link href={`https://metamask.io/download/`} target={"_blank"} className={`text-purple-mid`}>here</Link>.</p>
            </>
          )}
        </>
      ) : (
        <>
          <LoadSpinner colour={"purple-mid"} size={100} />
        </>
      )}
    </div >
  )
}
