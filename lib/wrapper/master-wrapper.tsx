"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { State } from "wagmi";
import Web3ModalProvider from "../providers/w3mProviders";
const MasterWrapper = ({
    children,
    initialState,
}: {
    children: React.ReactNode;
    initialState?: State;
}) => {
    const queryClient = new QueryClient();
    return (
        <Web3ModalProvider initialState= {initialState}>
            <QueryClientProvider client={queryClient}></QueryClientProvider>
            {children}
        </Web3ModalProvider>
    );
};

export default MasterWrapper;