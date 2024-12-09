import { Button } from "frames.js/next";
import { frames } from "../../frames";

const handleRequest = frames(async () => {
  
  return {
    image: (
      <div tw="flex flex-col">
        <div tw="flex flex-col">Successfully claimed tip. </div>
      </div>
    ),
    buttons: [
      <Button action="post" target={"/"}>
        Back
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
