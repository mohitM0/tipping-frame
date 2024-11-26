import { connectToDatabase } from "@/lib/db";
import Tip from "@/models/tippingTxData";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();
    const { id } = req.query;

    if (req.method === 'GET') {
        const tip = await Tip.findById(id);
        if (!tip) return res.status(404).json({ error: 'Tip not found' });

        res.status(200).json(tip);

    } else {
        res.status(405).json({ error: 'Method not allowed' });

    }
}