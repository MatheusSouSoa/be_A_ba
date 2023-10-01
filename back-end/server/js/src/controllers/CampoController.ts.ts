import { Request, Response } from "express";
import { campoRepository } from "../repositories/CampoRepository";

export class campoController {
    async create(req: Request, res: Response) {

        const {nome, tipo, nulo, template} = req.body


        try {
            
            const novoCampo = campoRepository.create({nome, tipo, nulo, template})

            return res.status(201).json(novoCampo)

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal Server Error"})
        }
    }
}