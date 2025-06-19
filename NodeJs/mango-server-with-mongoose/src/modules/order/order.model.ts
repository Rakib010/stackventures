import { Mango } from '../mango/mango.model';
import { IOrder } from './order.interface';
import { model, Schema, Types } from "mongoose";

// Sub-schema
const orderAddressSchema = new Schema({
    state: { type: String, required: true },
    street: { type: String, required: true },
    zipcode: { type: String, required: true },
    country: { type: String, required: true }
}, { _id: false });

// Main schema
const orderSchema = new Schema<IOrder>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    mango: { type: Schema.Types.ObjectId, ref: "Mango", required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number },
    status: {
        type: String,
        enum: ["processing", "pending", "completed"],
        default: "pending"
    },
    // Embedded sub-schema
    address: orderAddressSchema
}, { versionKey: false });


// pre hook middleware
orderSchema.pre('save', async function () {
    const mango = await Mango.findById(this.mango)
    if (!mango) throw new Error("Mango not found")
    this.totalPrice = mango.price*this.quantity
});



export const Order = model<IOrder>("Order", orderSchema);
