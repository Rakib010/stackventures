
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

export interface UserInstanceMethods {
    hashPassword(password: string): string
}
