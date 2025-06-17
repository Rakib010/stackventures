import { model, Schema } from "mongoose";
import { IAddress, IUser } from "../interfaces/user.interface";
import validator from 'validator';


// sub schema or embedding 
const addressSchema = new Schema<IAddress>({
    city: { type: String },
    street: { type: String },
    zip: { type: Number }
}, {
    _id: false
})


const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 10
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: [true, "Age keno deo nai"],
        min: [18, 'Age Must be at least 18,got {VALUE}'],  // custom message
        max: 60
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,

        // custom validation
        validate: {
            validator: function (value) {
                return /^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(value);
            },
            message: function (props) {
                return `Email ${props.value} is not valid email`
            }
        }

        // Validator Package
        // validate: [validator.isEmail, "Invalid Email sent {VALUE}"]
    },

    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: {
            values: ['user', 'admin'],
            message: "Role is not valid, got {value}"
        },
        default: 'user'
    },
    address: {
        type: addressSchema
    },
})




export const User = model("User", userSchema)

