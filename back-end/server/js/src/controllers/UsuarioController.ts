import { Request, Response } from "express";

export class UsuarioController {

    /** 
     * Esta é a função usada para criar usuarios
     * */ 
    async create(req: Request, res: Response) {
        const {nome, email, senha} = req.body

        if(!nome || !email || !senha)
            return res.status(400).json({message: "Todos os campos são obrigatorios."})

        try {
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal server error."})
        }

    }

}