import { frames } from "../frames";
import { contractAbi, contractAddress } from "@/lib/contracts/contractConfig";
import { transaction } from "frames.js/core";
import { Abi, Address, encodeFunctionData } from "viem";
import { bscTestnet } from "viem/chains";


const handleRequest = frames(async (ctx) => {

    if (!ctx?.message) {
        throw new Error("Invalid frame message");
    }
    
    if (!ctx?.message?.inputText) {
        return {
            image: (
                <div tw="bg-yellow-800 text-white w-full h-full flex flex-col justify-center items-center p-4">
                    <h2 tw="text-4xl font-bold mb-8 text-center">Refresh the Frame, then enter the amount to send in the input area and press send tip.  </h2>
                </div>
            )
        }
    }

    const amount = ctx?.message?.inputText;

    const frameUrl = ctx?.message?.frameUrl;
    const url = new URL(frameUrl);
    const tipId = url.searchParams.get('tipId');

    if (!tipId) {
        return {
            image: (
                <div tw="bg-yellow-800 text-white w-full h-full flex flex-col justify-center items-center p-4">
                    <h2 tw="text-4xl font-bold mb-8 text-center">Tip Id is not available in the frame url</h2>
                </div>
            )
        }
    };

    const calldata = encodeFunctionData({
        abi: contractAbi as Abi,
        functionName: "giveTip",
        args: [tipId] as const,
    });

    return transaction({
        chainId: `eip155:${bscTestnet.id}`,
        method: "eth_sendTransaction",
        params: {
            abi: contractAbi as Abi,
            to: contractAddress as Address,
            data: calldata,
            value: amount, // change this after getting amount from contract
        },
    });
})

export const POST = handleRequest;