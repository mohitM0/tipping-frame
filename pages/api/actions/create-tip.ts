import { composerAction, composerActionForm } from "frames.js/core";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const createTipFormUrl = new URL(
        "/form",
        process.env.NEXT_PUBLIC_VERCEL_URL
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
            : "http://localhost:3000"
    );

    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.status(204).end(); 
        return;
    }

    if (req.method === "GET") {
        try {
            const response = composerAction({
                action: {
                    type: "post",
                },
                icon: "poll",
                name: "Create a Tip",
                aboutUrl: process.env.NEXT_PUBLIC_VERCEL_URL
                    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
                    : "http://localhost:3000",
                description: "Create Tips.",
                imageUrl: "https://framesjs.org/logo.png",
            });

            const action = await response.json();
            res.status(200).json(action);
        } catch (error) {
            console.error("Error in GET handler:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else if (req.method === "POST") {
        try {
            const response = composerActionForm({
                title: "Create a Tip",
                url: createTipFormUrl.toString(),
            });
            const action = await response.json();
            res.status(200).json(action);
        } catch (error) {
            console.error("Error in POST handler:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}
