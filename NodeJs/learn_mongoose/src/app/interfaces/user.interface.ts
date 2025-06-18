import { Model } from "mongoose"

export interface IUser {
    firstName: string,
    lastName: string,
    age: Number,
    email: string,
    password: string
    role: 'user' | 'admin'
    address: IAddress
}

export interface IAddress {
    city: string,
    street: string,
    zip: number
}

// custom method 
export interface UserInstanceMethods {
    hashPassword(password: string): string
}

// static method 
export interface UserStaticMethods extends Model<IUser> {
    hashPassword(password: string): string
}


