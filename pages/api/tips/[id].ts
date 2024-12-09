import { connectToDatabase } from "@/lib/db";
import Tip from "@/models/tippingTxData";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectToDatabase();
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const tip = await Tip.findById(id);
            if (!tip) {
                return res.status(404).json({ error: 'Tip not found' });
            }
            res.status(200).json(tip);
        } catch{
            res.status(500).json({ error: 'Failed to fetch the tip! Internal server error' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const deletedTip = await Tip.findByIdAndDelete(id);
            if (!deletedTip) {
                return res.status(404).json({ error: 'Tip not found' });
            }
            res.status(200).json({ message: 'Tip deleted successfully', deletedTip });
        } catch{
            res.status(500).json({ error: 'Failed to delete the tip! Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
