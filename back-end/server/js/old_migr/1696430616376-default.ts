import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1696430616376 implements MigrationInterface {
    name = 'Default1696430616376'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Usuarios" RENAME COLUMN "nome_completo" TO "nome"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Usuarios" RENAME COLUMN "nome" TO "nome_completo"`);
    }

}
