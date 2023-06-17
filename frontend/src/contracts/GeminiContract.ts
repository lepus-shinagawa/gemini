import detectEthereumProvider from '@metamask/detect-provider';
import GeminiABI from "../contracts/gemini.json";
import Web3 from "web3";
import {HttpProvider} from "web3-core";

export class GeminiContract {
    constructor() {

    }

    private async getProvider(){
        const provider = await detectEthereumProvider();
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
            GeminiABI,
            "0xF6B862987DdB7e4125013E81663642C72F917bF8");
    }

    public async getResult(index) {
        const contract = await this.getContract();
        const result = await contract
            .methods["getResults"]().call();
        return result[index];
    }

    public async mint(index) {
        const accounts = await window.ethereum
            .request({method: 'eth_requestAccounts'})
            .catch((err) => {
                if (err.code === 4001) {
                    // EIP-1193 userRejectedRequest error
                    // If this happens, the user rejected the connection request.
                    throw new Error("Please connect to MetaMask.")
                } else {
                    throw new err;
                }
            });
        const account = accounts[0];

        const chainId = await window.ethereum
            .request({ method: 'eth_chainId' });
        if (chainId !== "0x250")
        {
            throw new Error("Please connect Astar network.")
        }

        const contract = await this.getContract();
        await contract.methods["mintNFT"]().send({
            from: account
        });
    }
}
