"use client";
import { contractAbi, contractAddress } from "@/lib/contracts/contractConfig";
// import { config } from "@/lib/config";
// import { contractAbi, contractAddress } from "@/lib/contracts/contractConfig";
// import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Abi, Address, encodeFunctionData } from "viem";
import { bscTestnet } from "viem/chains";
// import { useAccount } from "wagmi";


// async function createTip( receivedAddress: string, _tipId: string, _title: string, _description: string, _recipientAddress: string, _maxAmount: string) {

//   try {

// Prepare the contract write configuration
// const { writeContract: write, data} = useWriteContract();

// const hash = await writeContract(config, {
//   abi: contractAbi,
//   address: contractAddress,
//   functionName: 'createNewTip',
//   args: [_tipId, _title, _description, _recipientAddress, parseInt(_maxAmount, 10)]
// });

// console.log(hash);
// //wait for 5 tranasaction confirmation
// const receipt = await waitForTransactionReceipt(config, {
//   hash,
//   confirmations: 5,
// });
// console.log(receipt);

// if (receipt.status === "success") {
//   return {
//     status: "success",
//     message: "New Tip Created",
//     explorerHash: hash,
//   };
// } else {
//   return {
//     status: "reverted",
//     message: "Error in creating new tip. Please try again later.",
//   };
// }
//   } catch (error) {
//     console.log(error);
//     return {
//       status: "Error",
//       message: "Error in creating new tip. Please try again later after some time.",
//     };
//   }

// }

export default function TipForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tokens, setTokens] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  // const { isConnected } = useAccount();
  // const { open } = useWeb3Modal();

  // useEffect(() => {
  //   window.parent.postMessage({ action: "getWallet" }, "*");

  //   const handleMessage = (event: MessageEvent) => {
  //     if (event.origin !== "http://localhost:3000") return;

  //     const { walletClient } = event.data;
  //     if (walletClient) {
  //       console.log(`Received wallet client: ${walletClient}`);
  //     }
  //   };

  //   window.addEventListener("message", handleMessage);

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     window.removeEventListener("message", handleMessage);
  //   };
  // }, []);


  // const requestWriteTransaction = async (txDetails: any) => {
  //   return new Promise((resolve, reject) => {
  //     const parentOrigin = "http://localhost:3000/";

  //     // Request parent to sign the transaction
  //     window.parent.postMessage(
  //       {
  //         action: "writeTx",
  //         txDetails,
  //       },
  //       parentOrigin
  //     );

  //     // Listen for the response
  //     const handleMessage = (event: MessageEvent) => {
  //       if (event.origin !== parentOrigin) return;

  //       const { action, signedTx, error } = event.data;

  //       if (action === "signedTransaction") {
  //         window.removeEventListener("message", handleMessage);
  //         resolve(signedTx);
  //       } else if (action === "signedTransactionError") {
  //         window.removeEventListener("message", handleMessage);
  //         reject(new Error(error));
  //       }
  //     };

  //     window.addEventListener("message", handleMessage);
  //   });
  // };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (!title || !description || !recipientAddress || !senderAddress || !tokens) {
      return;
    }
    console.log("Inside submit")

    try {
      console.log("submitting Tip data:", {
        title,
        description,
        recipientAddress,
        senderAddress,
        tokens
      })
      const response = await fetch("/api/tips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          recipientAddress,
          senderAddress,
          tokens
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create a tip.")
      }

      const data = await response.json();
      const tipId = data._id;
      // const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
      // const tippingUrl = `https://${baseUrl}/frames?tipId=${tipId}`;

      // const txDetails = {
      //   address: contractAddress,
      //   abi: contractAbi,
      //   functionName: 'createNewTip',
      //   args: [tipId, title, description, recipientAddress, parseInt(tokens, 10)]
      // }

      // const result = await requestWriteTransaction(txDetails);

      // if (result.status !== "success") {
      //   console.error("Tip creation failed on-chain. Deleting the tip...");
      //   await fetch(`/api/tips/${tipId}`, {
      //     method: "DELETE",
      //   });
      //   throw new Error(result.message || "On-chain tip creation failed.");
      // }

      const calldata = encodeFunctionData({
        abi: contractAbi as Abi,
        functionName: "createNewTip",
        args: [tipId, title, description, recipientAddress, parseInt(tokens, 10)] as const,
      });

      const transaction = {
        chainId: `eip155:${bscTestnet.id}`,
        method: "sendTransaction",
        params: {
          abi: contractAbi as Abi,
          to: contractAddress as Address,
          data: calldata,
          value: "0",
        },
      };

      console.log(transaction);

      window.parent.postMessage(
        {
          type: "writeContract", data: {transaction},
        }, "*"
      );

      // window.parent.postMessage(
      //   {
      //     type: "newFrame", data: { tippingUrl },
      //   }, "*"
      // );

      setTitle("");
      setDescription("")
      setRecipientAddress("")
      setSenderAddress("")
      setTokens("")

      console.log("Tip created successfully:", data);

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error creating Tip:", error);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-yellow-800 text-white flex items-center justify-center p-4">
      <div className="bg-white text-black w-full max-w-md p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Tip Tokens</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter Title"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              Description
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter Description"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="recipientAddress" className="block text-sm font-medium mb-2">
              Recipient Address
            </label>
            <input
              id="recipientAddress"
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              required
              placeholder="Enter Recipient's Address"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="senderAddress" className="block text-sm font-medium mb-2">
              Sender Address
            </label>
            <input
              id="senderAddress"
              type="text"
              value={senderAddress}
              onChange={(e) => setSenderAddress(e.target.value)}
              required
              placeholder="Enter Sender's Address"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label htmlFor="tokens" className="block text-sm font-medium mb-2">
              Number of Tokens
            </label>
            <input
              id="tokens"
              type="number"
              value={tokens}
              onChange={(e) => setTokens(e.target.value)}
              required
              placeholder="Enter amount"
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-700"
          >
            Tip Tokens
          </button>

          {/* {!isConnected ? <button
            className="w-full py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-700"
            onClick={() => open()}>
            Connect Wallet
          </button> : <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-700"
          >
            Tip Tokens
          </button>
          } */}
        </form>
      </div>
    </div>
  );
}
