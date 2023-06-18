import detectEthereumProvider from '@metamask/detect-provider';
import GeminiABI from "../contracts/gemini.json";
import { AbiItem } from 'web3-utils'
import Web3 from "web3";
import { HttpProvider } from "web3-core";
import {DateFormatter} from "../DateFormatter.ts";

export class GeminiContract {
    constructor() {
    }

    private async getProvider(): Promise<HttpProvider>{
        const provider = await detectEthereumProvider<HttpProvider>();
        if (!provider) {
            throw new Error("Please install MetaMask!");
        }
        if (provider !== window.ethereum) {
            throw new Error("Do you have multiple wallets installed?")
        }
        return provider;
    }

    private async getContract(){
        const provider = await this.getProvider();
        const web3 = new Web3(provider as HttpProvider);
        return new web3.eth.Contract(
            GeminiABI as AbiItem[],
            "0x7aEE0e2c6B62612357864fABa052843D939b975f");
    }

    public async getTokenURI(tokenId: number){
        const contract = await this.getContract();
        return await contract
            .methods["tokenURI"](tokenId).call();
    }

    public async safeMint(date: Date, _: number): Promise<number> {
        const accounts = await window.ethereum
            .request({method: 'eth_requestAccounts'})
            .catch((err: any) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    throw new Error("MetaMaskと接続してください")
                } else {
                    throw new err;
                }
            });
        const account = accounts[0];

        const chainId = await window.ethereum
            .request({ method: 'eth_chainId' });
        if (chainId !== "0x250")
        {
            throw new Error("Astar networkに切り替えてください")
        }

        const contract = await this.getContract();
        await contract.methods["safeMint"](
            account,
            DateFormatter.exec(date, "yyyyMMdd"),
            0,
            // starSignIndex,
        ).send({
            from: account,
        });

        return 0;
    }
}
