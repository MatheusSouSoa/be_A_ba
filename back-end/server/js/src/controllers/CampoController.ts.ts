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

            return (novoCampo)

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal Server Error"})
        }
    }
}