"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campoController = void 0;
const CampoRepository_1 = require("../repositories/CampoRepository");
const TemplateRepository_1 = require("../repositories/TemplateRepository");
class campoController {
    async create(req, res) {
        const { nome, tipo, nulo, templateReq } = req.body;
        const template = await TemplateRepository_1.templateRepository.findOneBy({ id: Number(templateReq) });
        if (!template) {
            return res.status(404).json({ message: "No template found" });
        }
        try {
            const novoCampo = CampoRepository_1.campoRepository.create({ nome, tipo, nulo, template });
            return res.status(201).json(novoCampo);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
exports.campoController = campoController;
