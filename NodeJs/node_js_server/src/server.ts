import { createServer, Server } from "http"
import { routeHandler } from "./routes/product_routes"

const server: Server = createServer((req, res) => {
    routeHandler(req, res)
    //console.log(req)
})

server.listen(5000,'127.0.0.1', () => {
    console.log("Node js server is running")
})

