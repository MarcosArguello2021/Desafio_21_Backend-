import { Router } from "../deps.ts"
import {
    listarProductos,
    listarProductoById,
    agregarProducto,
    modificarProducto,
    borrarProducto
} from "../controllers/productoController.ts";

export const router = new Router()
  //Producto rutas
  .get("/api/productos", listarProductos)
  .get("/api/productos/:id", listarProductoById)
  .post("/api/productos", agregarProducto)
  .put("/api/productos/:id", modificarProducto)
  .delete("/api/productos/:id", borrarProducto)
  
