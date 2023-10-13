import { Request, Response } from "express";
import { campoRepository } from "../repositories/CampoRepository";
import { templateRepository } from "../repositories/TemplateRepository";

export class campoController {
    async create(req: Request, res: Response) {

        const {nome, tipo, nulo, templateReq} = req.body

        const template = await templateRepository.findOneBy({id: Number(templateReq)})
        if(!template){
            return res.status(404).json({message: "No template found"})
        }

        try {
            
            const novoCampo = campoRepository.create({nome, tipo, nulo, template})

            return res.status(201).json(novoCampo)

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal Server Error"})
        }
    }

  async findByTemplateId(id_template: number): Promise<any> {

      const templateToFind = await templateRepository.findOneBy({id: id_template})
      if(templateToFind)
          return campoRepository.count({where: {template: templateToFind}})
      return 0
  }

  async findByAllTemplateId(req: Request, res: Response): Promise<any> {
    const { id_template } = req.params;

    try {
      const templateToFind = await templateRepository.findOneBy({ id: parseInt(id_template) });
      
      if (templateToFind) {
          const campos = await campoRepository.find({ where: { template: templateToFind } });
          return res.json(campos); 
      } else {
          return res.status(404).json({ message: "Template não encontrado" });
      }
    } catch (error) {
      console.log(error);
    }
  }


  async deleteCampoByTemplateId(id_template: number): Promise<boolean> {
    const templateToFind = await templateRepository.findOneBy({ id: id_template });
  
    if (templateToFind) {
      try {
        await campoRepository.delete({ template: templateToFind });
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  
    return false;
  }
}