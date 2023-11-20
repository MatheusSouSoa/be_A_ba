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
exports.Campo = void 0;
// src/entities/Campo.ts
const typeorm_1 = require("typeorm");
const Template_1 = require("./Template");
let Campo = class Campo {
};
exports.Campo = Campo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Campo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Campo.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: false }),
    __metadata("design:type", String)
], Campo.prototype, "tipo", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Boolean)
], Campo.prototype, "nulo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Template_1.Template, (template) => template.campos),
    (0, typeorm_1.JoinColumn)({ name: "id_template" }),
    __metadata("design:type", Template_1.Template)
], Campo.prototype, "template", void 0);
exports.Campo = Campo = __decorate([
    (0, typeorm_1.Entity)({ name: "Campos" })
], Campo);
