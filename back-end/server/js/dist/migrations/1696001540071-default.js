"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1696001540071 = void 0;
class Default1696001540071 {
    constructor() {
        this.name = 'Default1696001540071';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Usuarios" ADD "senha" text NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Usuarios" DROP COLUMN "senha"`);
    }
}
exports.Default1696001540071 = Default1696001540071;
