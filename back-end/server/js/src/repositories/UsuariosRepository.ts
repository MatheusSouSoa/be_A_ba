import { AppDataSource } from "../data-source";
import { Usuario } from "../entities/Usuario";

export const  UsuarioRepository = AppDataSource.getRepository(Usuario)