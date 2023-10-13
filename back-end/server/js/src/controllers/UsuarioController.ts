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

            await UsuarioRepository.save(novoUsuario)

            const usuarioResponse = {
                id: novoUsuario.id,
                nome: novoUsuario.nome,
                email: novoUsuario.email,
                matricula: novoUsuario.matricula,
                isAdmin: novoUsuario.isAdmin,
                isNew: novoUsuario.isAdmin
            }
            // usuario.matricula = "000" + String(usuario.id + 5000)
            // await UsuarioRepository.save(usuario)

            return res.status(201).json({ message: "Usuário criado com sucesso.", usuario: usuarioResponse});
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Internal server error."})
        }
    }

    async login(req: Request, res: Response) {
        const { email, senha } = req.body;

        try {
            const user = await UsuarioRepository.findOne({ where: { email:email } });

            if (!user) {
                return res.status(401).json({ message: "Usuario nao existe.", email:email, senha });
            }

            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Credenciais inválidas." });
            }

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

    async listOldUsers(req: Request, res: Response) {
        try {
            const newUsers = await UsuarioRepository.find({ where: { isNew: false } });
            res.status(200).json(newUsers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }
    }
    
    async getUserById(req: Request, res: Response) {
        const { id } = req.params
        try {
            const usuario = await UsuarioRepository.findOne({where: {id: parseInt(id)}})
            console.log(usuario)
            res.status(200).json(usuario)
        } catch (err) {
            console.error(err)
            res.status(404).send()
        }
    }

    async changePermissions(req: Request, res: Response) {
        const { id, isNewParam, isAdminParam } = req.params;
        const isNew = isNewParam === "true"; 
        const isAdmin = isAdminParam === "true"

        try {
            const usuario = await UsuarioRepository.findOne({ where: { id: parseInt(id) } });
            
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
            
            usuario.isNew = isNew;
            usuario.isAdmin = isAdmin;
            await UsuarioRepository.save(usuario);
            
            return res.status(200).json({ message: `isNew atualizado para ${isNew} com sucesso.`, id: usuario.id });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }

    async aproveUser(req: Request, res: Response) {
        const  {id, isAdmin} = req.body;
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        
        try {
            const usuario = await UsuarioRepository.findOne({ where: { id: parseInt(id) } });
            
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
            
            await UsuarioRepository.remove(usuario);
            
            return res.status(200).json({ message: `Usuário excluído com sucesso.`, id: usuario.id});
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}