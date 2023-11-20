import { AppDataSource } from "../data-source";
import { Template } from "../entities/Template";

export const templateRepository = AppDataSource.getRepository(Template)