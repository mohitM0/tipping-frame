"use client";

import React, { ReactNode } from "react";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { Config, State, WagmiProvider } from "wagmi";
import { config, projectId } from "../config";

if (!projectId) throw new Error("Project ID is not defined");

// Create modal
createWeb3Modal({
  wagmiConfig: config as Config,
  projectId,
  themeMode: "dark",
  themeVariables: {
    "--w3m-color-mix": "grey",
  }
  },
);

export default function Web3ModalProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      {children}
    </WagmiProvider>
  );
}