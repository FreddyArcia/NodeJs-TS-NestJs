import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1687911025544 implements MigrationInterface {
    name = 'InitialMigration1687911025544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "security"."sec_person" ("person_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "person_name" character varying(50) NOT NULL, "person_last_name" character varying(50) NOT NULL, "person_email" character varying(50) NOT NULL, "person_phone" character varying(50) NOT NULL, CONSTRAINT "UQ_095b518ae448b28d703690e132b" UNIQUE ("person_email"), CONSTRAINT "PK_b1451d9f5062aad709cb885d032" PRIMARY KEY ("person_id"))`);
        await queryRunner.query(`CREATE TABLE "security"."sec_role" ("role_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role_name" character varying(50) NOT NULL, CONSTRAINT "PK_552e08f64cf488da7f363797d36" PRIMARY KEY ("role_id"))`);
        await queryRunner.query(`CREATE TABLE "security"."sec_user" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_nickname" character varying(50) NOT NULL, "user_password" character varying(50) NOT NULL, "person_id" uuid, "role_id" uuid, CONSTRAINT "REL_52e55789f84bc85f114d749891" UNIQUE ("person_id"), CONSTRAINT "PK_79f0e9f8dc0ef32d1f253d9ebed" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`ALTER TABLE "security"."sec_user" ADD CONSTRAINT "FK_52e55789f84bc85f114d749891c" FOREIGN KEY ("person_id") REFERENCES "security"."sec_person"("person_id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "security"."sec_user" ADD CONSTRAINT "FK_95eefaee48bd059809e036fd31a" FOREIGN KEY ("role_id") REFERENCES "security"."sec_role"("role_id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "security"."sec_user" DROP CONSTRAINT "FK_95eefaee48bd059809e036fd31a"`);
        await queryRunner.query(`ALTER TABLE "security"."sec_user" DROP CONSTRAINT "FK_52e55789f84bc85f114d749891c"`);
        await queryRunner.query(`DROP TABLE "security"."sec_user"`);
        await queryRunner.query(`DROP TABLE "security"."sec_role"`);
        await queryRunner.query(`DROP TABLE "security"."sec_person"`);
    }

}
