import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1752525103840 implements MigrationInterface {
    name = 'InitialMigration1752525103840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "deleted_at" TIMESTAMP, "active" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_url" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "original_url" character varying NOT NULL, "user_id" character varying NOT NULL, "short_url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "active" boolean NOT NULL DEFAULT true, "deleted_at" TIMESTAMP, "request_count" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_8644584d3620c8fd95111270b75" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_url"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
