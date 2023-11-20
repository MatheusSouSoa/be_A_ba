import { Request, Response } from "express";
import { diretorioRepository } from "../repositories/DiretorioRepository";
import { UsuarioRepository } from "../repositories/UsuariosRepository";
import { IsNull } from "typeorm";

export class DiretorioController {
    async create(req: Request, res: Response) {
        const { caminho, nome, userId, raiz } = req.body;

        console.log(caminho, nome, userId, raiz);

        const dir = await diretorioRepository.findOneBy({ nome });
        if (dir && dir.caminho+"/"+nome == caminho+"/"+nome) {
            console.log(dir.caminho+"/"+nome)
            return res.status(400).json({ "message": "Directory already exists" });
        }

        const userIdNumber = parseInt(userId);

        if (isNaN(userIdNumber)) {
            return res.status(400).json({ message: "Invalid userId" });
        }

        const usuario = await UsuarioRepository.findOneBy({ id: userIdNumber});

        if (!usuario) {
            return res.status(404).json({ message: "Usuario not found" });
        }

        try {
            let novoDir;

            console.log("caminho: ",caminho.split("/"))

            if (raiz || caminho != "") {
                // const raizDiretorio = await diretorioRepository.findOneBy({ id: parseInt(raiz) });
                const raizNome: string = caminho.split("/")
                console.log(raizNome)
                const raiz_id = await diretorioRepository.findOneBy({nome: raizNome[raizNome.length - 1]})
                if ( !raiz_id) {
                    return res.status(404).json({ message: "Raiz directory not found" });
                }
                novoDir = diretorioRepository.create({caminho: raiz_id ? `${caminho}/${nome}` : nome, usuario, nome, raiz: raiz_id });
            } else {
                novoDir = diretorioRepository.create({ caminho: nome, usuario, nome });
            }

            await diretorioRepository.save(novoDir);

            return res.status(201).json({ message: "Directory created successfully", directory: novoDir });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async getDiretorio(req: Request, res: Response) {
        const { diretorioId } = req.params;

        try {
            const diretorio = await diretorioRepository.find({
                relations: ['usuario', 'raiz', 'subdiretorios'],
                where: {id: parseInt(diretorioId)}
            });

            if (!diretorio) {
                return res.status(404).json({ message: "Diretorio not found" });
            }


            return res.status(200).json({ 
                id: diretorio[0].id,
                nome: diretorio[0].nome,
                caminho: diretorio[0].caminho,
                usuario_nome: diretorio[0].usuario.nome,
                usuario_matr: diretorio[0].usuario.matricula,
                usuario_id: diretorio[0].usuario.id,
                raiz: diretorio[0].raiz,
                subdiretorios: diretorio[0].subdiretorios
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async getRootDiretorio(req: Request, res: Response) {
        try {
            // Encontrar diretórios com caminho vazio ou raiz nula
            const diretorios = await diretorioRepository.find({
                relations: ['subdiretorios'],
                where: {raiz: IsNull()}
            });
    
            // Verificar se algum diretório foi encontrado
            // if (!diretorios || diretorios.length === 0) {
            //     return res.status(404).json({ message: "Nenhum diretório encontrado" });
            // }
    
            // // Retornar os detalhes dos diretórios encontrados
            // const diretoriosDetails = diretorios.map(diretorio => ({
            //     id: diretorio.id,
            //     nome: diretorio.nome,
            //     caminho: diretorio.caminho,
            //     usuario_nome: diretorio.usuario.nome,
            //     usuario_matr: diretorio.usuario.matricula,
            //     usuario_id: diretorio.usuario.id,
            //     raiz: diretorio.raiz,
            //     subdiretorios: diretorio.subdiretorios
            // }));
    
            return res.status(200).json(diretorios);
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
