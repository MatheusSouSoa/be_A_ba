import { AppDataSource } from "../data-source";
import { Diretorio } from "../entities/Diretorio";

export const diretorioRepository = AppDataSource.getRepository(Diretorio)