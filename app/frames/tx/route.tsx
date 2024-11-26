import { frames } from "../frames";

const handleRequest = frames(async (ctx) => {
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