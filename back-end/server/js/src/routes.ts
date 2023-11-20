import { Request, Response, Router } from 'express';
import { UsuarioController } from './controllers/UsuarioController';
import { TemplateController } from './controllers/TemplateController';
import { campoController } from './controllers/CampoController';
import { authMiddleware } from './middleware/authMiddleware';
import { ArquivoController } from './controllers/ArquivoController';
import { DiretorioController } from './controllers/DiretorioController';

const routes = Router();

routes.post('/api/usuario', new UsuarioController().create);
routes.post('/api/usuario/login', new UsuarioController().login);

routes.use(authMiddleware);

routes.get('/api/usuario/:id', new UsuarioController().getUserById);
routes.get(
  '/api/usuario/checkTempCamp/:id',
  new UsuarioController().checkTemplatesCampos,
);
routes.get('/api/admin/usuario/novos', new UsuarioController().listNewUsers);
routes.get('/api/admin/usuario/velhos', new UsuarioController().listOldUsers);
routes.put(
  '/api/admin/usuario/:id/update-isnew/:isNewParam/:isAdminParam',
  new UsuarioController().changePermissions,
);
routes.delete(
  '/api/admin/usuario/:id/delete/:isNewParam',
  new UsuarioController().deleteUser,
);

routes.post('/api/template', new TemplateController().create);
routes.get(
  '/api/admin/template/getAllAdmin',
  new TemplateController().listAllTemplatesAdmin,
);
routes.get(
  '/api/admin/template/getAllAdminDashboard',
  new TemplateController().listAllTemplatesAdminDashboard,
);
routes.get('/api/template/getAll', new TemplateController().listAllTemplates);
routes.put(
  '/api/admin/template/changeStatus/:id',
  new TemplateController().changeStatus,
);
routes.put(
  '/api/admin/template/aprove/:id',
  new TemplateController().aproveTemplate,
);
routes.delete(
  '/api/admin/template/denie/:id',
  new TemplateController().denieTemplate,
);

routes.get('/api/arquivo', new ArquivoController().getArquivos);
routes.get('/api/arquivo/:id', new ArquivoController().getArquivosByUserID);

routes.get(
  '/api/campos/:id_template',
  new campoController().findByAllTemplateId,
);

routes.post('/api/diretorios', new DiretorioController().create);
routes.get(
  '/api/diretorios/:diretorioId',
  new DiretorioController().getDiretorio,
);
routes.get('/api/diretorios-root', new DiretorioController().getRootDiretorio);
routes.get('/api/validar-token', (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  return res.status(200).json({ message: 'Token válido' });
});
routes.get('/api/admin/validar-token', (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  return res.status(200).json({ message: 'Token válido' });
});

export default routes;
