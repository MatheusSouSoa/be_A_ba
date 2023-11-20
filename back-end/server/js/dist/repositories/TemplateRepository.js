"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateRepository = void 0;
const data_source_1 = require("../data-source");
const Template_1 = require("../entities/Template");
exports.templateRepository = data_source_1.AppDataSource.getRepository(Template_1.Template);
