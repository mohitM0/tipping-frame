"use client";

import React, { ReactNode } from "react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { Config, State, WagmiProvider } from "wagmi";
import { projectId, wagmiAdapter } from "../config";
import ContextProvider from "../context";

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: wagmiAdapter.wagmiConfig as Config,
  projectId,
  themeMode: "dark",
  themeVariables: {
    "--w3m-color-mix": "grey",
  }
  },
);

export default function Web3ModalProvider({
  children,
  cookies
}: {
  children: ReactNode;
  cookies: string | null
}) {
  return (
    <ContextProvider cookies={cookies}>
        {children}
    </ContextProvider>
  );
}