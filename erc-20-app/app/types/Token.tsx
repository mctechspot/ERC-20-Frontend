import { SetStateAction } from "react";

export type TokenContentType = {
    name: string;
    symbol: string;
    decimal: number;
    image: string | null;
}

export type ManuallyCreatedToken = {
    creatingToken: boolean;
    setCreatingToken: React.Dispatch<SetStateAction<boolean>>;
    tokenContent: TokenContentType;
    setTokenContent: React.Dispatch<SetStateAction<TokenContentType>>;
}

export type GeneratedToken = {
    generatingToken: boolean;
    setGeneratingToken: React.Dispatch<SetStateAction<boolean>>;
    generatedToken: any;
    setGeneratedToken: React.Dispatch<SetStateAction<any>>;
    creatingToken: boolean;
    setCreatingToken: React.Dispatch<SetStateAction<boolean>>;
    tokenContent: TokenContentType;
    setTokenContent: React.Dispatch<SetStateAction<TokenContentType>>;
}

export type GeneratedTokenSuccess = {
    response: {
        name: string;
        symbol: string;
        image: string;
    }
}

export type GeneratedTokenError = {
    error: string;
}

export type SendTokenDetails = {
    quantity: number;
    from: string;
    to: string;
}