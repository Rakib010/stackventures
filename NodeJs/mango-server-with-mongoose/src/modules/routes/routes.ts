import { Router } from "express";
import userRoute from "../user/user.route";
import mangoRoute from "../mango/mango.route";
import orderRoute from '../order/order.route';

const routes = Router()

routes.use('/', userRoute)
routes.use('/', mangoRoute)
routes.use('/', orderRoute)

export default routes