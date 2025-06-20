import { Request, Response, NextFunction } from "express"
import { Order } from "./order.model";


// post method 
const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /*   const body = req.body;
          const order = await Order.create(body); */

        // instance method
        /* const order = new Order(req.body);
        await order.checkStock(); 
        await order.save(); */

        // static method 
        const order = await Order.checkStock(req.body.mango, req.body.quantity);


        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order,
        });

    } catch (error: any) {
        next(error)
    }
};
// get method 
const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await Order.find().populate('user').populate('mango');
        res.status(201).json({
            success: true,
            message: "Order retrieved successfully",
            order,
        });

    } catch (error: any) {
        next(error)
    }
};
// get single data by params
const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const OrderId = req.params.id
        const order = await Order.findById(OrderId);

        res.status(201).json({
            success: true,
            message: "Order get successfully",
            Order,
        });

    } catch (error: any) {
        next(error)
    }
};
// updated method
const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const order = await Order.findByIdAndUpdate(id, req.body,
            { new: true, runValidators: true }
        );
        res.status(201).json({
            success: true,
            message: "Order updated successfully",
            Order,
        });

    } catch (error: any) {
        next(error)
    }
};
// delete method
const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id
        const order = await Order.findByIdAndDelete(id);

        res.status(201).json({
            success: true,
            message: "Order Delete successfully",
            Order,
        });

    } catch (error: any) {
        next(error)
    }
};


export const OrderController = {
    createOrder,
    getOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
}