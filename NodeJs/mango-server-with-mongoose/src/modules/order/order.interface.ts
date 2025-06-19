import { Types } from "mongoose";

// userId, mangoId, Quantity, TotalPrice, Status
export interface IOrder {
    user: Types.ObjectId,
    mango: Types.ObjectId,
    quantity: number,
    totalPrice: number,
    status: "processing" | "pending" | "completed"
    address: {
        state: string,
        street: string,
        zipcode: string,
        country: string
    }
}