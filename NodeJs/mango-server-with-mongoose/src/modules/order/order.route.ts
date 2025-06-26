import { Router } from "express";
import { OrderController } from "./order.controller";

const orderRoute = Router();


orderRoute.post('/create-order', OrderController.createOrder)
orderRoute.get('/order', OrderController.getOrder)
orderRoute.get('/order/:id', OrderController.getOrderById)
orderRoute.patch('/order/:id', OrderController.updateOrder)
orderRoute.delete('/order/:id', OrderController.deleteOrder)



export default orderRoute