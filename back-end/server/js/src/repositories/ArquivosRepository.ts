import { Upload } from "../entities/Upload";
import { AppDataSource } from "../data-source";

export const arquivoRepository = AppDataSource.getRepository(Upload)