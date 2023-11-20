"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1696119827486 = void 0;
class Default1696119827486 {
    constructor() {
        this.name = 'Default1696119827486';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Templates" DROP COLUMN "limite_linhas"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "Templates" ADD "limite_linhas" integer`);
    }
}
exports.Default1696119827486 = Default1696119827486;
