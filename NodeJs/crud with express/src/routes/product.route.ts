import { Request, Response, Router } from "express";
import { productHandler} from "../controller/product.Controller";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json("Server is Running")
})
router.get('/products', productHandler.getProducts)
router.post('/products', productHandler.postProducts)
router.put('/products/:id', productHandler.UpdatedProducts)

export default router;