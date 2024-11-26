import { connectToDatabase } from "@/lib/db";
import Tip from "@/models/tippingTxData";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log("above db")

        await connectToDatabase();
        console.log("below db")
        if (req.method === 'GET') {
            const tips = await Tip.find({});
            res.status(200).json(tips);
        } else if (req.method === 'POST') {
            const { recepient, amount } = req.body;
            if (!recepient || !amount) {
                return res.status(400).json({ error: 'Invalid input' });
            }

            const tip = new Tip({
                recepient,
                amount
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