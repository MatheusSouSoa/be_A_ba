"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1696128768388 = void 0;
class Default1696128768388 {
    constructor() {
        this.name = 'Default1696128768388';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Usuarios" ADD CONSTRAINT "UQ_ca3e46c76538a31e48348447503" UNIQUE ("email")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Usuarios" DROP CONSTRAINT "UQ_ca3e46c76538a31e48348447503"`);
    }
}
exports.Default1696128768388 = Default1696128768388;
