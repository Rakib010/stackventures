import { Request, Response } from "express";
import { products } from "../data/products";

const getProducts = (req: Request, res: Response) => {
    res.status(200).json(products)
}

const postProducts = (req: Request, res: Response) => {
    const newProduct = req.body
    products.push(newProduct)
    res.status(200).json(products)
}
const UpdatedProducts = (req: Request, res: Response) => {
    const { id } = req.params
    const pId = Number(id)
    const updatedProduct = req.body.name
    const index = products.findIndex(p => p.id === pId)
    products[index].name = updatedProduct
    res.status(200).json(products)
}

export const productHandler = {
    getProducts,
    postProducts,
    UpdatedProducts
}

