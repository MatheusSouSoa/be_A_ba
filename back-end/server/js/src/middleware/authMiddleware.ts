import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { UsuarioRepository } from "../repositories/UsuariosRepository";

type JwtPayload = {
    id: number
    isAdmin: boolean
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers

    if(!authorization) return res.status(401).json({message: "Usuario não autenticado"})

    const token = authorization.split(" ")[1]

    const { id, isAdmin } = jwt.verify(token, process.env.JWT_PASS ?? "") as JwtPayload

    const user = await UsuarioRepository.findOneBy({ id })

    if(!user) return res.status(401).json({message: "Usuario não autorizado"})

    if (req.path.startsWith('/api/admin')) {
        if (isAdmin !== true) {
            return res.status(403).json({ message: "Acesso não autorizado" });
        }
    }

    const {senha:_, ...loggedUser} = user

    req.user = loggedUser

    next()

}