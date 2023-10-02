import { Router } from "express";
import { UsuarioController } from "./controllers/UsuarioController";
import { TemplateController } from "./controllers/TemplateController";

const routes = Router();

routes.post('/api/usuario', new UsuarioController().create)
routes.post('/api/template', new TemplateController().create)
routes.get("/api/usuario/novos", new UsuarioController().listNewUsers);
routes.post("/api/usuario/login", new UsuarioController().login);

export default routes