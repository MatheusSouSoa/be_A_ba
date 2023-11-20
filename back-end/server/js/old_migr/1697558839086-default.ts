import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1697558839086 implements MigrationInterface {
    name = 'Default1697558839086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Uploads" ADD "id_usuario" integer`);
        await queryRunner.query(`ALTER TABLE "Uploads" ADD CONSTRAINT "FK_9a954a6726692dc151fe091dadd" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Uploads" DROP CONSTRAINT "FK_9a954a6726692dc151fe091dadd"`);
        await queryRunner.query(`ALTER TABLE "Uploads" DROP COLUMN "id_usuario"`);
    }

}
