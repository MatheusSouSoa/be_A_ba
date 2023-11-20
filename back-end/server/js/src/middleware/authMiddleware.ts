import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { UsuarioRepository } from '../repositories/UsuariosRepository';

type JwtPayload = {
  id: number;
  isAdmin: boolean;
  exp: number;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Usuario não autenticado' });
    }

    const token = authorization.split(' ')[1];
    try {
      jwt.decode(token);
    } catch (error) {
      return res.status(401).json({ message: 'Token malformado' });
    }
    const { id, isAdmin, exp } = jwt.verify(
      token,
      process.env.JWT_PASS ?? '',
    ) as JwtPayload;

    const currentTimeStamp = Math.floor(Date.now() / 1000);

    if (currentTimeStamp > exp) {
      return res
        .status(401)
        .json({ message: 'Sessão expirada. Efetue o login novamente aosjdnioanfdafa adhosad asdjoashdoaihdas dasd ahd  ahsdaohdahsdhoashdsand jondas ndoisadahsdioash dioahdoahdioashd oahdsioasdoaisdhoaihsd iohasiod aois' });
    }

    const user = await UsuarioRepository.findOneBy({ id });
    if (!user)
      return res.status(401).json({ message: 'Usuario não autorizado' });

    if (req.path.startsWith('/api/admin')) {
      if (isAdmin !== true) {
        return res.status(403).json({ message: 'Acesso não autorizado' });
      }
    }

    const { senha: _, ...loggedUser } = user;
    req.user = loggedUser;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: 'Token expirado' });
    }
    console.error(error);
    return res.status(500).json(error);
  }
};
