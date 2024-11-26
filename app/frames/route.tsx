import { Button } from "frames.js/next";
import { frames } from "./frames";

const handleRequest = frames(async (ctx) => {

    const { tipTo } = ctx.searchParams;
    return {
        image: (
            <div tw="bg-yellow-800 text-white w-full h-full flex flex-col justify-center items-center p-4">
                <h2 tw="text-4xl font-bold mb-8 text-center">Tipping Frame</h2>
                <p tw="text-3xl text-center mt-4">Tip to {tipTo}</p>
            </div>
        ),
        buttons:[
            <Button action="post" target={"/tx/success"}>
                Tip
            </Button>
        ]

    }
})

export const GET = handleRequest;
export const POST = handleRequest;