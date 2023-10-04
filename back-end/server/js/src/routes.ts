import { Router } from "express";
import { UsuarioController } from "./controllers/UsuarioController";
import { TemplateController } from "./controllers/TemplateController";

const routes = Router();

routes.post('/api/usuario', new UsuarioController().create)
routes.post('/api/template', new TemplateController().create)
routes.get("/api/usuario/novos", new UsuarioController().listNewUsers);
routes.get("/api/usuario/velhos", new UsuarioController().listOldUsers);
routes.post("/api/usuario/login", new UsuarioController().login);
routes.get("/api/usuario/:id", new UsuarioController().getUserById)
<<<<<<< HEAD
routes.put("/api/usuario/:id/update-isnew/:isNewParam",new UsuarioController().changePermissions)
routes.delete("/api/usuario/:id/delete/:isAdminParam", new UsuarioController().deleteUser)
=======
>>>>>>> 44829ab5a2d8955a09fd00176e30b19761fd2d89

export default routes