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
}