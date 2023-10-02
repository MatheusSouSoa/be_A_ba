import { Request, Response } from "express";
import { templateRepository } from "../repositories/TemplateRepository";
import { campoRepository } from "../repositories/CampoRepository";
import { UsuarioRepository } from "../repositories/UsuariosRepository";
import { Campo } from "../entities/Campo";

export class TemplateController {

    async create(req: Request, res: Response) {

        const {usuarioId ,nome, extensao, campos } = req.body;

        const userId = Number(usuarioId)

        const usuario = await UsuarioRepository.findOneBy({id: userId})

        if(!usuario){
            return res.status(404).json({message: "Usuario not found"})
        }

        const data = new Date(Date.now());
        const status = false;
        const isNew = true;

        try {
            const novoTemplate = templateRepository.create({ nome, extensao, campos, status, data, isNew, usuario });
            
            novoTemplate.campos = [];
            const templateSalvo = await templateRepository.save(novoTemplate);
            
            if (campos && Array.isArray(campos)) {
                campos.forEach(async (element: any) => {
                    const campo = campoRepository.create({
                        nome: element.nome,
                        tipo: element.Tipo,
                        nulo: element.Nulo === "Sim" ? true : false,
                        template: templateSalvo
                    });

                    await campoRepository.save(campo);
                });
            }
            novoTemplate.campos = campos;
            
            return res.status(201).json(novoTemplate);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
