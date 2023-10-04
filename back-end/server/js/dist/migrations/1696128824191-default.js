"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1696128824191 = void 0;
class Default1696128824191 {
    constructor() {
        this.name = 'Default1696128824191';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Usuarios" ADD CONSTRAINT "UQ_95acda01c5124a41b224c9a0e60" UNIQUE ("matricula")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Usuarios" DROP CONSTRAINT "UQ_95acda01c5124a41b224c9a0e60"`);
    }
}
exports.Default1696128824191 = Default1696128824191;
