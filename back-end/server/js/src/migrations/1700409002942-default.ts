import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1700409002942 implements MigrationInterface {
    name = 'Default1700409002942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Uploads" RENAME COLUMN "data_de_envio" TO "data"`);
        await queryRunner.query(`ALTER TABLE "Templates" RENAME COLUMN "data_de_criacao" TO "data"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Templates" RENAME COLUMN "data" TO "data_de_criacao"`);
        await queryRunner.query(`ALTER TABLE "Uploads" RENAME COLUMN "data" TO "data_de_envio"`);
    }

}
