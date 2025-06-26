import { Mango } from '../mango/mango.model';
import { IOrder, OrderMethod, } from './order.interface';
import { Model, model, Schema, Types } from "mongoose";

// Sub-schema
const orderAddressSchema = new Schema({
    state: { type: String, required: true },
    street: { type: String, required: true },
    zipcode: { type: String, required: true },
    country: { type: String, required: true }
}, { _id: false });

// Main schema
const orderSchema = new Schema<IOrder, Model<IOrder>, OrderMethod>({
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    mango: { type: Schema.Types.ObjectId, ref: "mango", required: true },
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


// pre hook 
orderSchema.pre('save', async function () {
    const mango = await Mango.findById(this.mango)
    if (!mango) throw new Error("Mango not found")
    this.totalPrice = mango.price * this.quantity
});

// post hook 


// instance method 
orderSchema.method('checkStock', async function () {
    const mango = await Mango.findById(this.mango)
    if (!mango) throw new Error("Mango not found");

    if (mango.stock < this.quantity) {
        throw new Error(`Not enough mango stock. Available: ${mango.stock}, Requested: ${this.quantity}`);
    }
    return true
})

// static method
orderSchema.static('checkStock', async function (mangoId: string, quantity: number) {
    const mango = await Mango.findById(mangoId);

    if (!mango) throw new Error("Mango not found");

    if (mango.stock < quantity) {
        throw new Error(`Insufficient mango stock. Available: ${mango.stock}, Requested: ${quantity}`);
    }

    return true;
});




// export const Order = model<IOrder>("Order", orderSchema);
export const Order = model<IOrder, Model<IOrder, {}, OrderMethod>>("Order", orderSchema);
