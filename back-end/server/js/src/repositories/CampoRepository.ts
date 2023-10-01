import { AppDataSource } from "../data-source";
import { Campo } from "../entities/Campo";

export const campoRepository = AppDataSource.getRepository(Campo)