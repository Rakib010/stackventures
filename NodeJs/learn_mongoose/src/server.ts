import { Server } from "http";
import app from "./app";
import mongoose from 'mongoose'


let server: Server;
const port = 5000

async function main() {
    try {
        await mongoose.connect('mongodb+srv://nodewithexpresjs:T6CarfrnIUsrP9Dq@cluster0.g0svigm.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0');
        console.log('Connected to mongoDB using Mongoose')

        server = app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })

    } catch (error) {
        console.log(error)
    }
}

main()