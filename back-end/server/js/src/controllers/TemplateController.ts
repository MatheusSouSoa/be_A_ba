import { Request, Response } from "express";
import { templateRepository } from "../repositories/TemplateRepository";
import { campoRepository } from "../repositories/CampoRepository";
import { UsuarioRepository } from "../repositories/UsuariosRepository";
import { campoController } from "./CampoController";
import { Usuario } from "../entities/Usuario";

export class TemplateController {

  async create(req: Request, res: Response) {

      const {usuarioId ,nome, extensao, campos } = req.body;

      const userId = Number(usuarioId)

      const usuario = await UsuarioRepository.findOneBy({id: userId})

      if(!usuario){
          return res.status(404).json({message: "Usuario not found"})
      }

      const data = new Date(Date.now());
      const status = false;
      const isNew = true;

      try {
          const novoTemplate = templateRepository.create({ nome, extensao, campos, status, data, isNew, usuario });
          
          novoTemplate.campos = [];
          const templateSalvo = await templateRepository.save(novoTemplate);


          
          if (campos && Array.isArray(campos)) {
              campos.forEach(async (element: any) => {
                  if(!element.nome) return res.status(400).json({ message: "O nome da coluna é obrigatorio"})
                  if(!element.tipo) return res.status(400).json({ message: "O tipo é obrigatorio"})
                  console.log("nulo: ",element.nulo)
                  const campo = campoRepository.create({
                      nome: element.nome,
                      tipo: element.tipo,
                      nulo: element.nulo === true ? true : false,
                      template: templateSalvo
                  });

                  await campoRepository.save(campo);
              });
          }
          novoTemplate.campos = campos;
          
          return res.status(201).json(novoTemplate);

      } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Internal Server Error" });
      }
  }

  async listAllTemplatesAdmin(req: Request, res: Response) {
    try {
  
      const templates = await templateRepository.find({relations: ["usuario"]});
  
      const templatesComContagem = await Promise.all(
        templates.map(async (template) => {
            
            const controladorCampos = new campoController()
            const campos = await controladorCampos.findByTemplateId(template.id)
            template.campos = campos
            
            const templateOrdenado = {
              nome: template.nome,
              formato: template.extensao,
              campos: campos,
              criado_por: template.usuario.nome,
              status: template.status,
              id: template.id,
              isNew: template.isNew,
              id_criador: template.usuario.id
            };

            return templateOrdenado
          })
      );
  
      if (templatesComContagem) return res.status(200).json(templatesComContagem);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async listAllTemplatesAdminDashboard(req: Request, res: Response) {
    try {
  
      const templates = await templateRepository.find({relations: ["usuario"]});
  
      const templatesComContagem = await Promise.all(
        templates.map(async (template) => {
            
            const controladorCampos = new campoController()
            const campos = await controladorCampos.findByTemplateId(template.id)
            template.campos = campos
            
            const templateOrdenado = {
              nome: template.nome,
              formato: template.extensao,
              campos: campos,
              criado_por: template.usuario.nome,
              data: template.data,
              status: template.status,
              id: template.id,
              isNew: template.isNew,
              id_criador: template.usuario.id
            };

            return templateOrdenado
          })
      );
  
      if (templatesComContagem) return res.status(200).json(templatesComContagem);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async listAllTemplates(req: Request, res: Response) {
    try {
  
      const templates = await templateRepository.find({
        relations: ["usuario"],
        where: {isNew: false}
      });
  
      const templatesComContagem = await Promise.all(
        templates.map(async (template) => {
            
            const controladorCampos = new campoController()
            const campos = await controladorCampos.findByTemplateId(template.id)
            template.campos = campos
            
            const templateOrdenado = {
              nome: template.nome,
              formato: template.extensao,
              campos: campos,
              criado_por: template.usuario.nome,
              data: template.data,
              isNew: template.isNew,
              id: template.id,
              status: template.status,
              id_criador: template.usuario.id
            };
            return templateOrdenado
          })
      );
  
      if (templatesComContagem) return res.status(200).json(templatesComContagem);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async changeStatus(req: Request, res: Response) {
    const {id} = req.params

    try {
      const template = await templateRepository.findOneBy({id: parseInt(id)})
      
      if(template){
        template.status = !template.status
        await templateRepository.save(template)
        return res.status(200).json({message: "Template definido como "+ template.status +" com sucesso."})
      }
      else{
        return res.status(404).json({message: "Nenhum template encontrado"})
      }
      
    } catch (error) {
      console.error(error)
      console.log(error)
      res.status(500).json({
        message: "Erro interno no servidor. Por favor, tente novamente mais tarde.", 
        status: 500
      })
    }
  }

  async aproveTemplate(req: Request, res: Response) {
    const {id} = req.params
    try {
      const template = await templateRepository.findOneBy({id: parseInt(id)})
      
      if(template){
        template.status = !template.status
        template.isNew = false
        await templateRepository.save(template)
        return res.status(200).json({message: "Template definido como "+ template.status +" com sucesso."})
      }
      else{
        return res.status(404).json({message: "Nenhum template encontrado"})
      }
      
    } catch (error) {
      console.error(error)
      console.log(error)
      res.status(500).json({
        message: "Erro interno no servidor. Por favor, tente novamente mais tarde.", 
        status: 500
      })
    }
  }

  async denieTemplate(req: Request, res: Response) {
    const {id} = req.params
    try {
      const template = await templateRepository.findOneBy({id: parseInt(id)})
      
      if(template){

        if(template.isNew !== true) return res.status(400).json({message: "Template não pode ser excluido por não ser novo"})

        const controladorCampos = new campoController()

        const deletedWithSuccess = await controladorCampos.deleteCampoByTemplateId(template.id)

        if(deletedWithSuccess){
          await templateRepository.remove(template)
          return res.status(200).json({message: "Template excluido com sucesso."})
        } else {
          return res.status(500).json({ message: "Erro ao excluir campos relacionados." });
        }

      }
      else{
        return res.status(404).json({message: "Nenhum template encontrado"})
      }
      
    } catch (error) {
      console.error(error)
      res.status(500).json({
        message: "Erro interno no servidor. Por favor, tente novamente mais tarde.", 
        status: 500
      })
    }
  }

  async getTemplateById(id: number) {
    const templateToFind = await templateRepository.findOneBy({id: id})
      if(templateToFind)
          return templateToFind.nome
      return 0
  }

}
