"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const data_source_1 = require("../data-source");
const Usuario_1 = require("../entities/Usuario");
exports.UsuarioRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
