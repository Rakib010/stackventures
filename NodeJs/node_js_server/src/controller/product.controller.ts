import { IncomingMessage, ServerResponse } from "http"
import { product } from "../db/product"
import { parseProduct } from "../utils/parseProduct";
import { IProduct } from "../types/product";
import path from "path";
import fs from 'fs'

//const filepath = path.join(__dirname, "../db/product.ts");

export const handleProduct = async (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url

    const idMatch = url?.match(/^\/product\/([^\/]+)$/)
    const id = idMatch ? Number(idMatch[1]) : null

    // get product
    if (url === '/product' && req.method === "GET") {
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify(product))
    }

    // post product 
    else if (url === '/product' && req.method === "POST") {
        try {
            const productParse = await parseProduct(req)

            const newProduct: IProduct = { id: productParse.id, name: productParse.name }

            product.push(newProduct)

            /* fs.writeFileSync(filepath, JSON.stringify(product, null, 2), {
                encoding: "utf-8",
            }); */

            res.writeHead(201, { 'content-type': 'application/json' })
            res.end(JSON.stringify(product))
        } catch (err) {
            res.writeHead(400)
            res.end('Error Occurred')
        }
    }

    // if product available then updated else insert  
    else if (idMatch && req.method === "PUT") {
        const productParse = await parseProduct(req)

        const index = product.findIndex((p) => (p.id) === id);

        if (index !== -1) {
            product[index].name = productParse.name
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify(product))
        } else {
            res.writeHead(400)
            res.end('Error Occurred')
        }
    }

    // delete product
    else if (idMatch && req.method === "DELETE") {
        const index = product.findIndex((p) => (p.id) === id);
        if (index !== -1) {
            product.splice(index, 1)
            res.writeHead(200, { 'content-type': 'application/json' })
            res.end(JSON.stringify({ message: 'Delete Successful' }))
        } else {
            res.writeHead(400)
            res.end('Error Occurred')
        }

    }

}  