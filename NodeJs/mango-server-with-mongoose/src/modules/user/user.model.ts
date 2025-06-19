import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: [true, "This Email is already exist"],
        validate: {
            validator: function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            },
            message: function (props) {
                return `${props.value} is not a valid Email!`
            }
        }
    },
    phone: {
        type: String,
        required: true,
        unique: [true, "This Number is already exist"],
        validate: {
            validator: function (v) {
                return /^(\+880|880|0)1[3-9][0-9]{8}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Must be at least 6, got {VALUE}']
    },
    role: {
        type: String,
        enum: {
            values: ['Admin', "Customer"],
            message: '{VALUE} is not supported'
        },
        default: 'Customer'
    }
})

const User = model<IUser>("user", userSchema)
export default User;

