"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload = void 0;
// src/entities/Upload.ts
const typeorm_1 = require("typeorm");
const Template_1 = require("./Template");
let Upload = class Upload {
};
exports.Upload = Upload;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Upload.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Upload.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Date)
], Upload.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Upload.prototype, "qtd_linhas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Upload.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Template_1.Template, (template) => template.uploads),
    (0, typeorm_1.JoinColumn)({ name: "id_template" }),
    __metadata("design:type", Template_1.Template)
], Upload.prototype, "template", void 0);
exports.Upload = Upload = __decorate([
    (0, typeorm_1.Entity)({ name: "Uploads" })
], Upload);
