import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {

    const { tipId } = ctx.searchParams;

    if(!tipId){
        return {
            image: (
                <div tw="bg-yellow-800 text-white w-full h-full flex flex-col justify-center items-center p-4">
                    <h2 tw="text-4xl font-bold mb-8 text-center">Tip Id is not prsent in the frame url.</h2>
                </div>
            ),
        }
    }

    const response = await fetch(`/api/${tipId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    if (!response.ok) {
        throw new Error("Failed to fetch a tip.")
    }

    const data = await response.json();
    if(!data){
        return {
            image: (
                <div tw="bg-yellow-800 text-white w-full h-full flex flex-col justify-center items-center p-4">
                    <h2 tw="text-4xl font-bold mb-8 text-center">Tip Id is invalid. No such Tip exists.</h2>
                </div>
            ),
        }
    }
    const { recipientAddress, senderAddress, tokens } = data;

    return {
        image: (
            <div tw="bg-yellow-800 text-white w-full h-full flex flex-col justify-center items-center p-4">
                <h2 tw="text-4xl font-bold mb-8 text-center">Tipping Frame</h2>
                <p tw="text-3xl text-center mt-4">Tipping to {recipientAddress} </p>
                <p tw="text-3xl text-center mt-4">Tipped by {senderAddress} </p>
                <p tw="text-3xl text-center mt-4">Tipping amount {tokens} </p>
            </div>
        ),
        
        buttons: [
            <Button action="tx" target={"/txGiveTip"} post_url={"/txGiveTip/success"}>
                Send Tip
            </Button>,
            <Button action="post" target={"/txGiveTip"}>
                click me
            </Button>,
            <Button action="tx" target={"/txClaimTip"} post_url={"/txClaimTip/success"}>
                Claim your Tip
            </Button>
        ],
        textInput: (
            "Enter Tip amount here"
        )
    }
})

export const GET = handleRequest;
export const POST = handleRequest;