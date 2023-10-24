import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1697559188086 implements MigrationInterface {
    name = 'Default1697559188086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Uploads" ("id" SERIAL NOT NULL, "nome" text NOT NULL, "data" TIMESTAMP NOT NULL, "qtd_linhas" integer NOT NULL, "path" text NOT NULL, "id_template" integer, "id_usuario" integer, CONSTRAINT "PK_b669c64a4f24775babe83453c84" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Usuarios" ("id" SERIAL NOT NULL, "nome" text NOT NULL, "matricula" text NOT NULL, "isAdmin" boolean NOT NULL, "isNew" boolean NOT NULL, "email" text NOT NULL, "senha" text NOT NULL, CONSTRAINT "UQ_95acda01c5124a41b224c9a0e60" UNIQUE ("matricula"), CONSTRAINT "UQ_ca3e46c76538a31e48348447503" UNIQUE ("email"), CONSTRAINT "PK_6b4c9e5c7d35b294307b3fd0fea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Templates" ("id" SERIAL NOT NULL, "nome" text NOT NULL, "extensao" text NOT NULL, "status" boolean NOT NULL, "isNew" boolean NOT NULL, "data" TIMESTAMP NOT NULL, "id_usuario" integer, CONSTRAINT "PK_ae9a06577edc00742f94b43dd40" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Campos" ("id" SERIAL NOT NULL, "nome" text NOT NULL, "tipo" text NOT NULL, "nulo" boolean NOT NULL, "id_template" integer, CONSTRAINT "PK_7ef0095f2902e192361e0f7e834" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Uploads" ADD CONSTRAINT "FK_5d523a072715090ff2e6af661f5" FOREIGN KEY ("id_template") REFERENCES "Templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Uploads" ADD CONSTRAINT "FK_9a954a6726692dc151fe091dadd" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Templates" ADD CONSTRAINT "FK_6f7e13f337d3fa13c84691257ec" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Campos" ADD CONSTRAINT "FK_be27705e30f87f579f661e4230b" FOREIGN KEY ("id_template") REFERENCES "Templates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Campos" DROP CONSTRAINT "FK_be27705e30f87f579f661e4230b"`);
        await queryRunner.query(`ALTER TABLE "Templates" DROP CONSTRAINT "FK_6f7e13f337d3fa13c84691257ec"`);
        await queryRunner.query(`ALTER TABLE "Uploads" DROP CONSTRAINT "FK_9a954a6726692dc151fe091dadd"`);
        await queryRunner.query(`ALTER TABLE "Uploads" DROP CONSTRAINT "FK_5d523a072715090ff2e6af661f5"`);
        await queryRunner.query(`DROP TABLE "Campos"`);
        await queryRunner.query(`DROP TABLE "Templates"`);
        await queryRunner.query(`DROP TABLE "Usuarios"`);
        await queryRunner.query(`DROP TABLE "Uploads"`);
    }

}
