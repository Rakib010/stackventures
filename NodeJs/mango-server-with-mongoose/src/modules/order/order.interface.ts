import { Model, Types } from "mongoose";

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

// instance method  
export interface OrderMethod {
    checkStock(id: string, quantity: number): Promise<any>
}

// static method 
export interface OrderMethod extends Model<IOrder> {
    checkStock(): Promise<any>
}
