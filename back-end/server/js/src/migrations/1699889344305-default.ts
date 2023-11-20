import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1699889344305 implements MigrationInterface {
    name = 'Default1699889344305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Diretorios" ("id" SERIAL NOT NULL, "nome" text NOT NULL, "caminho" text NOT NULL, "id_usuario" integer, "raiz_id" integer, CONSTRAINT "PK_17ddcd0dca28c190e2c718313a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Diretorios" ADD CONSTRAINT "FK_11fa1016ad3bf3578a5f9d39452" FOREIGN KEY ("id_usuario") REFERENCES "Usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Diretorios" ADD CONSTRAINT "FK_cd1f0e17c3f7d9efab338ac3817" FOREIGN KEY ("raiz_id") REFERENCES "Diretorios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Diretorios" DROP CONSTRAINT "FK_cd1f0e17c3f7d9efab338ac3817"`);
        await queryRunner.query(`ALTER TABLE "Diretorios" DROP CONSTRAINT "FK_11fa1016ad3bf3578a5f9d39452"`);
        await queryRunner.query(`DROP TABLE "Diretorios"`);
    }

}
