import { Button } from "frames.js/next";
import { frames } from "../../frames";

const handleRequest = frames(async (ctx) => {

  if (!ctx?.message) {
    throw new Error("Invalid frame message");
  }

  const amount = ctx?.message?.inputText;
  
  return {
    image: (
      <div tw="flex flex-col">
        <div tw="flex flex-col">Successfully tipped {amount} </div>
      </div>
    ),
    buttons: [
      <Button key="back" action="post" target={"/"}>
        Back
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
