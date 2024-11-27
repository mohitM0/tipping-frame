import { frames } from "../frames";

const handleRequest = frames(async (ctx) => {
    if (!ctx?.message) {
        throw new Error("Invalid frame message");
    }
    const address = await ctx.walletAddress();

    return {
        image: (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                Open Frames - Frames.js Starter
            </div>
        ),
    }
})

export const POST = handleRequest;