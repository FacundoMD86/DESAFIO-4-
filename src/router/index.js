import { Router } from "express";
import productRouter from "./product.router.js";

const indexRouter = Router()

//configurar las rutas de cada recurso
indexRouter.use('/products',productRouter)

export default indexRouter