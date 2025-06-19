import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import userRoute from "./modules/user/user.route";
import mangoRoute from "./modules/mango/mango.route";
import routes from "./modules/routes/routes";

const app = express();

app.use(cors());
app.use(express.json());

// middleware
/* app.use(userRoute)
app.use(mangoRoute) */
app.use(routes)


// main server 
app.get('/', (req, res) => {
    res.send({ success: true, message: 'Mango server here' })
})

app.listen(config.port, () => {
    console.log(`Mango Server Running on port ${config.port}`);
});

async function server() {
    try {
        // console.log(config)
        await mongoose.connect(config.database_url as string);
        console.log("Connected to database");
    } catch (error) {
        console.error("Server error:", error);
    }
}
server();
