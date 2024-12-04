import { connectToDatabase } from "@/lib/db";
import Tip from "@/models/tippingTxData";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await connectToDatabase();

        if (req.method === 'GET') {
            const tips = await Tip.find({});
            res.status(200).json(tips);
        } else if (req.method === 'POST') {
            const { title, description, recipientAddress, senderAddress, tokens } = req.body;
            if (!title || !description || !recipientAddress || !senderAddress || !tokens) {
                return res.status(400).json({ error: 'Invalid input' });
            }

            const tip = new Tip({
                title,
                description,
                recipientAddress,
                senderAddress,
                tokens
            });
            await tip.save();
            res.status(201).json(tip);
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error("Error in API handler:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}