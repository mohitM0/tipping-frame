"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TipForm() {
  const [tokens, setTokens] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [senderAddress, setSenderAddress] = useState("");
  const [tipResponse, setTipResponse] = useState(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const recipientAddress = formData.get("recipientAddress")?.toString();
    const senderAddress = formData.get("senderAddress")?.toString();
    const amount = formData.get("tokens")

    if (!recipientAddress || !senderAddress || !amount) {
      setErrorMessage("A Recipient Address, Sender Address and Amout is required");
      toast.error("All fields are required!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      console.log("submitting Tip data:", {
        recipientAddress,
        senderAddress,
        amount
      })
      const response = await fetch("/api/tips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientAddress,
          senderAddress,
          amount
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create a tip.")
      }

      const data = await response.json();
      const tipId = data._id;
      const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
      const tippingUrl = `${baseUrl}/frames?tipId=${tipId}`;

      window.parent.postMessage(
        {
          type: "newFrame", data: { tippingUrl },
        }, "*"
      );
      setTipResponse({ ...data, tippingUrl })
      setErrorMessage(null);
      console.log("Tip created successfully:", data);

    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error creating Tip:", error);
        setErrorMessage(error.message);
      } else {
        console.error("Unknown error:", error);
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-yellow-800 text-white flex items-center justify-center p-4">
      <div className="bg-white text-black w-full max-w-md p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Tip Tokens</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        </form>
      </div>
    </div>
  );
}
