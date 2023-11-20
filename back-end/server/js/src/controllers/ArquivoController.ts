import { Request, Response } from 'express';
import { arquivoRepository } from '../repositories/ArquivosRepository';
import { UsuarioRepository } from '../repositories/UsuariosRepository';

export class ArquivoController {
  async getArquivos(req: Request, res: Response) {
    try {
      const arquivos = await arquivoRepository.find({
        relations: ['template', 'usuario'],
      });

      if (arquivos) {
        const resultadoTransformado = arquivos.map((arquivo) => {
          return {
            nome: arquivo.nome,
            template: arquivo.template.nome,
            enviado_por: arquivo.usuario.nome,
            data: arquivo.data,
            status: arquivo.template.status,
            download: arquivo.path,
            id: arquivo.id,
            id_usuario: arquivo.usuario.id,
          };
        });

        return res.status(200).json(resultadoTransformado);
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async getArquivosByUserID(req: Request, res: Response) {
    try {
      const user = await UsuarioRepository.findOneBy({
        id: parseInt(req.params.id),
      });
      if (user) {
        const arquivos = await arquivoRepository.find({
          where: { usuario: user },
          relations: ['template', 'usuario'],
        });

        if (arquivos) {
          const resultadoTransformado = arquivos.map((arquivo) => {
            return {
              nome: arquivo.nome,
              template: arquivo.template.nome,
              enviado_por: arquivo.usuario.nome,
              data: arquivo.data,
              status: arquivo.template.status,
              download: arquivo.path,
              id: arquivo.id,
              id_usuario: arquivo.usuario.id,
            };
          });

          return res.status(200).json(resultadoTransformado);
        }
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  async downloadArquivo(req: Request, res: Response) {
    try {
      const fileId = req.params.id;

      const arquivo = await arquivoRepository.findOneBy({
        id: parseInt(fileId),
      });

      if (arquivo) {
        res.download(arquivo.path, (err) => {
          if (err) {
            console.error('Erro ao baixar o arquivo:', err);
            res.status(500).json({ error: err });
          }
        });
      } else {
        res.status(404).json({ error: 'Arquivo não encontrado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
}
