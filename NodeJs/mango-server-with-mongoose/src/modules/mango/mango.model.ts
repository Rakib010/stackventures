import { model, Schema } from "mongoose";
import { IMango } from "./mango.interface";

export const mangoSchema = new Schema<IMango>({
    Name: { type: String, required: true, trim: true },
    Variety: { type: String, required: true },
    unit: {
        type: String,
        enum: ["KG", "TON"],
        default: 'KG'
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    origin: {
        type: String,
        required: true,
        default: "Unknown"
    },
    season: {
        type: String,
        enum: ['Summer', 'Winter'],
        default: 'summer'
    }
}, {
    timestamps: true,

})

export const Mango = model<IMango>("mango", mangoSchema)