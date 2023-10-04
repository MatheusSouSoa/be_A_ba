"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const UsuariosRepository_1 = require("../repositories/UsuariosRepository");
const bcrypt = require("bcrypt");
class UsuarioController {
    /**
     * Esta é a função usada para criar usuarios
     * ela recebe na requisição um nome, email e senha
     * */
    async create(req, res) {
        const { nome, email, senha, matricula } = req.body;
        if (!nome || !email || !senha || !matricula)
            return res.status(400).json({ message: "Todos os campos são obrigatorios." });
        const userEmail = await UsuariosRepository_1.UsuarioRepository.findOne({ where: { email: email } });
        const userMatricula = await UsuariosRepository_1.UsuarioRepository.findOne({ where: { matricula: matricula } });
        if (userEmail)
            return res.status(409).json({ message: "Email ja cadastrado" });
        if (userMatricula)
            return res.status(409).json({ message: "Matricula ja cadastrada" });
        try {
            const hashedSenha = await bcrypt.hash(senha, 10);
            const isAdmin = false;
            const isNew = true;
            const count = await UsuariosRepository_1.UsuarioRepository.createQueryBuilder().getCount();
            // const matricula: string | undefined = String( 5000 + (count + 1))
            const novoUsuario = UsuariosRepository_1.UsuarioRepository.create({ nome, email, senha: hashedSenha, isAdmin, isNew, matricula });
            const usuario = await UsuariosRepository_1.UsuarioRepository.save(novoUsuario);
            // usuario.matricula = "000" + String(usuario.id + 5000)
            // await UsuarioRepository.save(usuario)
            return res.status(201).json({ message: "Usuário criado com sucesso.", usuario: novoUsuario });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
    async login(req, res) {
        const { email, senha } = req.body;
        try {
            const user = await UsuariosRepository_1.UsuarioRepository.findOne({ where: { email: email } });
            if (!user) {
                return res.status(401).json({ message: "Usuario nao existe.", email: email, senha });
            }
            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Credenciais inválidas." });
            }
            res.status(200).json({ message: "Autenticação bem-sucedida.", user });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }
    }
    async listNewUsers(req, res) {
        try {
            const newUsers = await UsuariosRepository_1.UsuarioRepository.find({ where: { isNew: true } });
            res.status(200).json(newUsers);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }
    }
    async listOldUsers(req, res) {
        try {
            const newUsers = await UsuariosRepository_1.UsuarioRepository.find({ where: { isNew: false } });
            res.status(200).json(newUsers);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }
    }
    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const usuario = await UsuariosRepository_1.UsuarioRepository.findOne({ where: { id: parseInt(id) } });
            console.log(usuario);
            res.status(200).json(usuario);
        }
        catch (err) {
            console.error(err);
            res.status(404).send();
        }
    }
    async changePermissions(req, res) {
        const { id, isNewParam } = req.params;
        const isNew = isNewParam === "true"; // Converte a string para um valor booleano
        try {
            const usuario = await UsuariosRepository_1.UsuarioRepository.findOne({ where: { id: parseInt(id) } });
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
            usuario.isNew = isNew;
            await UsuariosRepository_1.UsuarioRepository.save(usuario);
            return res.status(200).json({ message: `isNew atualizado para ${isNew} com sucesso.` });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
    async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const usuario = await UsuariosRepository_1.UsuarioRepository.findOne({ where: { id: parseInt(id) } });
            if (!usuario) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
            await UsuariosRepository_1.UsuarioRepository.remove(usuario);
            return res.status(200).json({ message: `Usuário excluído com sucesso.` });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro interno do servidor." });
        }
    }
}
exports.UsuarioController = UsuarioController;
