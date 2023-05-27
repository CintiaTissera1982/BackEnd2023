import express from "express";
import { routerProduct } from "./routes/products.routes.js";
import { routerCart } from "./routes/carts.routes.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routerProduct);
app.use("/api/carts", routerCart);


app.use("*", async (req, res) => {
  res.json({
    error: -1,
    message: "La ruta es invalida",
  });
});
app.listen("8080", console.log("Escuchando puerto 8080"));
