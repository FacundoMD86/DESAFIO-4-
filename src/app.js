// Imports
import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import viewRouter from './router/view.router.js';
import ProductRouter from "./router/product.router.js";
import CartRouter from "./router/carts.router.js";

import ProductManager from './productos/ProductsManager.js';

//const productManager = new ProductManager("./src/files/Productos.json");

//Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));

//Puerto de enlace
const PORT = 8080;

//Static
app.use(express.static((`${__dirname}/public`)));

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.get("/", (req, res)=>{
    res.render("realtimeproducts");
});

//Routers
app.use("/api/products", ProductRouter);
app.use("/api/carts", CartRouter);
app.use("/api/view", viewRouter);

const server = app.listen(PORT, () =>{
    console.log(`Express por Local Host ${server.address().port}`)
});
server.on("error", (error) => console.log(`Error del servidor ${error}`));

//Socket
const socketServer = new Server(server);
const pmanager=new ProductManager( __dirname +"/files/productos.json")

socketServer.on("connection",async (socket)=>{
    console.log("cliente conectado con id:" ,socket.id)
    const products = await pmanager.getProduct({});
    socket.emit('productos', products);

    socket.on('addProduct', async data => {
        await pmanager.addProduct(data);
        const updatedProducts = await pmanager.getProduct({}); // Obtener la lista actualizada de productos
        socket.emit('productosUpdated', updatedProducts);
      });

      socket.on("deleteProduct", async (id) => {
        console.log("ID del producto a eliminar:", id);
        const deletedProduct = await pmanager.deleteProduct(id);
        const updatedProducts = await pmanager.getProduct({});
        socketServer.emit("productosUpdated", updatedProducts);
      });
})









