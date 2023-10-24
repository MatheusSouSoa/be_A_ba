import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1696119827486 implements MigrationInterface {
    name = 'Default1696119827486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Templates" DROP COLUMN "limite_linhas"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Templates" ADD "limite_linhas" integer`);
    }

}
