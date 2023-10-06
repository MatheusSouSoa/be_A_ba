import { Request, Response } from "express";
import { templateRepository } from "../repositories/TemplateRepository";
import { campoRepository } from "../repositories/CampoRepository";
import { UsuarioRepository } from "../repositories/UsuariosRepository";
import { campoController } from "./CampoController.ts";
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
                  const campo = campoRepository.create({
                      nome: element.nome,
                      tipo: element.tipo,
                      nulo: element.nulo === "Sim" ? true : false,
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


  async listAllTemplates(req: Request, res: Response) {
    try {
  
      const templates = await templateRepository.find({relations: ["usuario"]});
  
      const templatesComContagem = await Promise.all(
        templates.map(async (template: {
          status: any;
          usuario: any;
          nome: any;
          extensao: any;
          campos: any; 
          id: any;
          isNew: any 
          }) => {
            
            const controladorCampos = new campoController()
            const campos = await controladorCampos.findByTemplateId(template.id)
            template.campos = campos
            
            const templateOrdenado = {
              nome: template.nome,
              formato: template.extensao,
              campos: campos,
              criado_por: template.usuario.nome, // Substitua pelo atributo correto do usuário
              status: template.status,
              id: template.id,
              isNew: template.isNew,
            };

            return templateOrdenado
          })
      );
  
      if (templatesComContagem) return res.status(200).json(templatesComContagem);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

      

}
