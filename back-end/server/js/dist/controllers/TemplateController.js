"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateController = void 0;
const TemplateRepository_1 = require("../repositories/TemplateRepository");
const CampoRepository_1 = require("../repositories/CampoRepository");
const UsuariosRepository_1 = require("../repositories/UsuariosRepository");
class TemplateController {
    async create(req, res) {
        const { usuarioId, nome, extensao, campos } = req.body;
        const userId = Number(usuarioId);
        const usuario = await UsuariosRepository_1.UsuarioRepository.findOneBy({ id: userId });
        if (!usuario) {
            return res.status(404).json({ message: "Usuario not found" });
        }
        const data = new Date(Date.now());
        const status = false;
        const isNew = true;
        try {
            const novoTemplate = TemplateRepository_1.templateRepository.create({ nome, extensao, campos, status, data, isNew, usuario });
            novoTemplate.campos = [];
            const templateSalvo = await TemplateRepository_1.templateRepository.save(novoTemplate);
            if (campos && Array.isArray(campos)) {
                campos.forEach(async (element) => {
                    const campo = CampoRepository_1.campoRepository.create({
                        nome: element.nome,
                        tipo: element.Tipo,
                        nulo: element.Nulo === "Sim" ? true : false,
                        template: templateSalvo
                    });
                    await CampoRepository_1.campoRepository.save(campo);
                });
            }
            novoTemplate.campos = campos;
            return res.status(201).json(novoTemplate);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
exports.TemplateController = TemplateController;
