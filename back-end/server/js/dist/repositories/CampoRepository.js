"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campoRepository = void 0;
const data_source_1 = require("../data-source");
const Campo_1 = require("../entities/Campo");
exports.campoRepository = data_source_1.AppDataSource.getRepository(Campo_1.Campo);
