import { Application } from "./deps.ts";
import {router} from "./router/routes.ts";  
const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 3000;
console.log("Servidor escuchando en el puerto " + PORT);
await app.listen({ port: PORT });
