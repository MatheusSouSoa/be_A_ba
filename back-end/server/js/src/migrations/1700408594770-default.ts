import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1700408594770 implements MigrationInterface {
    name = 'Default1700408594770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Uploads" RENAME COLUMN "data" TO "data_de_envio"`);
        await queryRunner.query(`ALTER TABLE "Templates" RENAME COLUMN "data" TO "data_de_criacao"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Templates" RENAME COLUMN "data_de_criacao" TO "data"`);
        await queryRunner.query(`ALTER TABLE "Uploads" RENAME COLUMN "data_de_envio" TO "data"`);
    }

}
