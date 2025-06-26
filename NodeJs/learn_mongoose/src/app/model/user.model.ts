import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethods, UserStaticMethods } from "../interfaces/user.interface";
import validator from 'validator';
import bcrypt from "bcryptjs";
import { Note } from "./notes.model";

// sub schema or embedding 
const addressSchema = new Schema<IAddress>({
    city: { type: String },
    street: { type: String },
    zip: { type: Number }
}, {
    _id: false
})


const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>({
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
        /* validate: {
            validator: function (value) {
                return /^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(value);
            },
            message: function (props) {
                return `Email ${props.value} is not valid email`
            }
        } */

        // Validator Package
        validate: [validator.isEmail, "Invalid Email sent {VALUE}"]
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
    }
}, {
    versionKey: false,
    timestamps: true,

    // Virtuals
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// custom method
userSchema.method("hashPassword", async function (planPassword: string) {
    const password = await bcrypt.hash(planPassword, 10)
    return password
})

// static method
userSchema.static("hashPassword", async function (planPassword: string) {
    const password = await bcrypt.hash(planPassword, 10)
    return password
})

// pre hooks (middleware)
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// post hooks (middleware)
userSchema.post("findOneAndDelete", async function (doc, next) {
    if (doc) {
        console.log(doc)
        await Note.deleteMany({ userId: doc._id })
    }
    next()
})

// Virtuals are fields that are not stored in the database, but are computed values based on existing data in your documents.
userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`
})



export const User = model<IUser, UserStaticMethods>("User", userSchema)

