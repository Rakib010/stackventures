import { Router } from "express";
import { mangoController } from "./mango.controller";

const mangoRoute = Router();


mangoRoute.post('/create-mango', mangoController.createMango)
mangoRoute.get('/mango', mangoController.getMango)
mangoRoute.get('/mango/:id', mangoController.getMangoById)
mangoRoute.patch('/mango/:id', mangoController.updateMango)
mangoRoute.delete('/mango/:id', mangoController.deleteMango)





export default mangoRoute