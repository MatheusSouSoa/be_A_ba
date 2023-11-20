import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1700069580912 implements MigrationInterface {
    name = 'Default1700069580912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Diretorios" DROP CONSTRAINT "FK_cd1f0e17c3f7d9efab338ac3817"`);
        await queryRunner.query(`ALTER TABLE "Diretorios" ADD CONSTRAINT "FK_cd1f0e17c3f7d9efab338ac3817" FOREIGN KEY ("raiz_id") REFERENCES "Diretorios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Diretorios" DROP CONSTRAINT "FK_cd1f0e17c3f7d9efab338ac3817"`);
        await queryRunner.query(`ALTER TABLE "Diretorios" ADD CONSTRAINT "FK_cd1f0e17c3f7d9efab338ac3817" FOREIGN KEY ("raiz_id") REFERENCES "Diretorios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
