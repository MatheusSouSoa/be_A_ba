import { Request, Response } from "express";
import { templateRepository } from "../repositories/TemplateRepository";
import { campoRepository } from "../repositories/CampoRepository";

export class TemplateController {
    async create(req: Request, res: Response) {

        const { nome, extensao, campos } = req.body;

        const data = new Date(Date.now());
        const status = false;
        const isNew = true;

        try {
            const novoTemplate = templateRepository.create({ nome, extensao, status, data, isNew });
            
            novoTemplate.campos = [];
            const templateSalvo = await templateRepository.save(novoTemplate);
            
            // Agora, vamos adicionar os campos ao template
            if (campos && Array.isArray(campos)) {
                campos.forEach(async (element: any) => {
                    // Você pode criar e adicionar os campos aqui
                    const campo = campoRepository.create({
                        nome: element.nome,
                        tipo: element.Tipo,
                        nulo: element.Nulo === "Sim" ? true : false,
                    });
            
                    // Associe o campo ao template
                    campo.template = templateSalvo;
            
                    // Salve o campo no banco de dados
                    await campoRepository.save(campo);
            
                    // Adicione o campo ao template
                    templateSalvo.campos.push(campo);
                });
            }

            return res.status(201).json(novoTemplate);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
