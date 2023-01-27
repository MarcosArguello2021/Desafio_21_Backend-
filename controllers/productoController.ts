import { Producto } from "../types/producto.ts";
import { Context, helpers } from "../deps.ts";

const productos:Producto[] = []

export const listarProductos =async (ctx: Context) => {
  try {
    ctx.response.body = productos;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};

export const listarProductoById = async (ctx: Context) => {
  const id = Number(helpers.getQuery(ctx, { mergeParams: true }).id)
  try {
    const producto:Producto = <Producto>productos.find((producto:Producto) => producto.id == id)
    ctx.response.body = producto || {};
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};
export const agregarProducto = async (ctx: Context)=> {
  
  try {
    const body = await ctx.request.body().value;
    const { nombre, descripcion, precio } = JSON.parse(body);
  
    const productoCreado:Producto = {
      id : productos.length? (productos[productos.length-1].id + 1) : 1,
      nombre,
      descripcion,
      precio,
    }
    productos.push(productoCreado)
    ctx.response.body = productoCreado;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};


export const modificarProducto = async (ctx: Context) => {
  try {
    const id = Number(helpers.getQuery(ctx, { mergeParams: true }).id)
    const body = await ctx.request.body().value;
    const { nombre, descripcion, precio } = JSON.parse(body);
    const productoActualizado:Producto = {id,nombre,descripcion,precio}
    const index = productos.findIndex((producto:Producto) => producto.id == id)
    //console.log(productoActualizar, index)
    productos.splice(index,1,productoActualizado)
    ctx.response.body = productoActualizado;
  } catch (err) {
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};

export const borrarProducto = async (ctx: Context) => {
  const id = Number(helpers.getQuery(ctx, { mergeParams: true }).id)
  try {
    const index = await productos.findIndex((producto:Producto) => producto.id == id)
    const productoBorrado:Producto = productos.splice(index,1)[0]
    ctx.response.body = productoBorrado;
  } catch (err) {
    ctx.response.status = 404;
    ctx.response.body = { msg: err.message };
  }
};