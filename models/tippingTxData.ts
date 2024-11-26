import mongoose, { Document, Model, Schema } from "mongoose";

interface TipDocument extends Document {
    _id: mongoose.Types.ObjectId;  
    recepient: string;
    amount: string;
}

const TipSchema: Schema = new Schema({
    recepient: { type: String, required: true},
    amount: { type: String, required: true }

}, { timestamps: true});

const Tip: Model<TipDocument> = mongoose.models.Tip || mongoose.model<TipDocument>('Tip', TipSchema);
export default Tip;