import { Router } from "express";
import { UsuarioController } from "./controllers/UsuarioController";
import { TemplateController } from "./controllers/TemplateController";

const routes = Router();

routes.post('/usuario', new UsuarioController().create)
routes.post('/template', new TemplateController().create)

export default routes