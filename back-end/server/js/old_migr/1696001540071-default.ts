import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1696001540071 implements MigrationInterface {
    name = 'Default1696001540071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Usuarios" ADD "senha" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Usuarios" DROP COLUMN "senha"`);
    }

}
