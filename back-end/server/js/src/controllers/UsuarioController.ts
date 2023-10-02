import { Request, Response } from "express";
import { UsuarioRepository } from "../repositories/UsuariosRepository";
import { Usuario } from "../entities/Usuario";
const bcrypt = require("bcrypt");

export class UsuarioController {

    /** 
     * Esta é a função usada para criar usuarios
     * ela recebe na requisição um nome, email e senha
     * */ 
    async create(req: Request, res: Response) {
        const {nome, email, senha, matricula} = req.body

        if(!nome || !email || !senha || !matricula)
            return res.status(400).json({message: "Todos os campos são obrigatorios."})

        const userEmail = await UsuarioRepository.findOne({where: {email: email}})
        const userMatricula = await UsuarioRepository.findOne({where: {matricula: matricula}})

        if(userEmail)
            return res.status(409).json({message: "Email ja cadastrado"})

        if(userMatricula)
            return res.status(409).json({message: "Matricula ja cadastrada"})

        try {
            const hashedSenha = await bcrypt.hash(senha, 10);
            const isAdmin:boolean = false
            const isNew:boolean = true
            const count:number = await UsuarioRepository.createQueryBuilder().getCount();
            // const matricula: string | undefined = String( 5000 + (count + 1))

            const novoUsuario:Usuario = UsuarioRepository.create({nome, email, senha: hashedSenha, isAdmin, isNew, matricula})

            const usuario = await UsuarioRepository.save(novoUsuario)

            // usuario.matricula = "000" + String(usuario.id + 5000)
            // await UsuarioRepository.save(usuario)

            return res.status(201).json({ message: "Usuário criado com sucesso.", usuario: novoUsuario});
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal server error."})
        }
    }

    async login(req: Request, res: Response) {
        const { email, senha } = req.body;
        console.log(email, senha);

        try {
            const user = await UsuarioRepository.findOne({ where: { email:email } });
            // Verifique se o usuário com o email fornecido existe no banco de dados

            if (!user) {
                return res.status(401).json({ message: "Usuario nao existe.", email:email, senha });
            }

            // Verifique se a senha fornecida corresponde à senha no banco de dados
            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            console.log(isPasswordValid)
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Credenciais inválidas." });
            }

            // Autenticação bem-sucedida, retorne uma resposta de sucesso
            res.status(200).json({ message: "Autenticação bem-sucedida.", user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }
    }

    async listNewUsers(req: Request, res: Response) {
        try {
            const newUsers = await UsuarioRepository.find({ where: { isNew: true } });
            res.status(200).json(newUsers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }
    }
    
}