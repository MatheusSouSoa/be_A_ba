import { Router } from "express";
import { UsuarioController } from "./controllers/UsuarioController";
import { TemplateController } from "./controllers/TemplateController";
import { campoController } from "./controllers/CampoController";
import { authMiddleware } from "./middleware/authMiddleware";
import { ArquivoController } from "./controllers/ArquivoController";

const routes = Router();


routes.post('/api/usuario', new UsuarioController().create)
routes.post("/api/usuario/login", new UsuarioController().login);

routes.use(authMiddleware)

routes.get("/api/usuario/:id", new UsuarioController().getUserById)
routes.get("/api/usuario/checkTempCamp/:id", new UsuarioController().checkTemplatesCampos)
routes.get("/api/admin/usuario/novos", new UsuarioController().listNewUsers);
routes.get("/api/admin/usuario/velhos", new UsuarioController().listOldUsers);
routes.put("/api/admin/usuario/:id/update-isnew/:isNewParam/:isAdminParam",new UsuarioController().changePermissions)
routes.delete("/api/admin/usuario/:id/delete/:isNewParam", new UsuarioController().deleteUser)

routes.post('/api/template', new TemplateController().create)
routes.get('/api/admin/template/getAllAdmin', new TemplateController().listAllTemplatesAdmin)
routes.get('/api/admin/template/getAllAdminDashboard', new TemplateController().listAllTemplatesAdminDashboard)
routes.get('/api/template/getAll', new TemplateController().listAllTemplates)
routes.put('/api/admin/template/changeStatus/:id', new TemplateController().changeStatus)
routes.put('/api/admin/template/aprove/:id', new TemplateController().aproveTemplate)
routes.delete('/api/admin/template/denie/:id', new TemplateController().denieTemplate)

routes.get('/api/arquivo', new ArquivoController().getArquivos)
routes.get('/api/arquivo/:id', new ArquivoController().getArquivosByUserID)

routes.get("/api/campos/:id_template", new campoController().findByAllTemplateId)


export default routes