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
exports.Template = void 0;
// src/entities/Template.ts
const typeorm_1 = require("typeorm");
const Usuario_1 = require("./Usuario");
const Upload_1 = require("./Upload");
const Campo_1 = require("./Campo");
let Template = class Template {
};
exports.Template = Template;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Template.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Template.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Template.prototype, "extensao", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Boolean)
], Template.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Boolean)
], Template.prototype, "isNew", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Date)
], Template.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Usuario_1.Usuario, (usuario) => usuario.templates),
    (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
    __metadata("design:type", Usuario_1.Usuario)
], Template.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Upload_1.Upload, (upload) => upload.template),
    __metadata("design:type", Array)
], Template.prototype, "uploads", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Campo_1.Campo, (campo) => campo.template),
    __metadata("design:type", Array)
], Template.prototype, "campos", void 0);
exports.Template = Template = __decorate([
    (0, typeorm_1.Entity)({ name: "Templates" })
], Template);
