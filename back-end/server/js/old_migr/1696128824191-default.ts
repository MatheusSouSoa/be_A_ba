import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1696128824191 implements MigrationInterface {
    name = 'Default1696128824191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Usuarios" ADD CONSTRAINT "UQ_95acda01c5124a41b224c9a0e60" UNIQUE ("matricula")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Usuarios" DROP CONSTRAINT "UQ_95acda01c5124a41b224c9a0e60"`);
    }

}
