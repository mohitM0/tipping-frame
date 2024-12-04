import mongoose, { Document, Model, Schema } from "mongoose";

interface TipDocument extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    recipientAddress: string;
    senderAddress: string;
    amount: string;
    isActive: boolean;
}

const TipSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    recipientAddress: { type: String, required: true },
    senderAddress: { type: String, required: true },
    amount: { type: String, required: true },
    isActive: { type: Boolean, required: true }
}, { timestamps: true });

const Tip: Model<TipDocument> = mongoose.models.Tip || mongoose.model<TipDocument>('Tip', TipSchema);
export default Tip;