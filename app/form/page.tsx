"use client";
import { useState } from "react";

export default function TipForm() {
  const [tokens, setTokens] = useState("");
  const [recipient, setRecipient] = useState("");

  const handleSubmit = async (e:any) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-yellow-800 text-white flex items-center justify-center p-4">
      <div className="bg-white text-black w-full max-w-md p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Tip Tokens</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium mb-2">
              Recipient Username
            </label>
            <input
              id="recipient"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
              placeholder="Enter recipient username"
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
