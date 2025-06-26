import { IncomingMessage, ServerResponse } from "http"
import { product } from "../db/product"
import { handleProduct } from "../controller/product.controller"

export const routeHandler = async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url
    if (url === '/' && req.method === "GET") {
        res.writeHead(200, { 'content-type': 'text/plain' })
        res.end('welcome to node js server ')
    }
    else if (url?.startsWith('/product')) {
        await handleProduct(req, res)
    }
    //  ey kaj ene korle hobe but clean code er move kore r ekta folder nie gelam -> handleProduct
    /* else if (url === '/product' && req.method === "GET") {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify(product))
    } */
    else {
        res.writeHead(404)
        res.end('Bhai to path vul korchen  ')
    }
}