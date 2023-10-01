import { Request, Response } from "express";
import { UsuarioRepository } from "../repositories/UsuariosRepository";
import { Usuario } from "../entities/Usuario";

export class UsuarioController {

    /** 
     * Esta é a função usada para criar usuarios
     * ela recebe na requisição um nome, email e senha
     * */ 
    async create(req: Request, res: Response) {
        const {nome, email, senha} = req.body

        if(!nome || !email || !senha)
            return res.status(400).json({message: "Todos os campos são obrigatorios."})

        const userEmail = await UsuarioRepository.findOne({where: {email: email}})

        if(userEmail)
            return res.status(409).json({message: "Email already exists"})

        try {
            const isAdmin:boolean = false
            const isNew:boolean = true
            const count:number = await UsuarioRepository.createQueryBuilder().getCount();
            const matricula: string | undefined = String( 5000 + (count + 1))

            const novoUsuario:Usuario = UsuarioRepository.create({nome, email, senha, isAdmin, isNew, matricula})

            const usuario = await UsuarioRepository.save(novoUsuario)

            usuario.matricula = "000" + String(usuario.id + 5000)
            await UsuarioRepository.save(usuario)

            return res.status(201).json({ message: "Usuário criado com sucesso.", usuario: novoUsuario});
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal server error."})
        }
    }
    
}