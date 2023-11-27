import { MigrationInterface, QueryRunner } from "typeorm";

export class MessageEntity1701082559646 implements MigrationInterface {
    name = 'MessageEntity1701082559646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "content" text NOT NULL, "hasBeenRead" boolean NOT NULL DEFAULT false, "writtenById" uuid, "writtenToId" uuid, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_5bd41ea8f9fe89e7ec2fd91915a" FOREIGN KEY ("writtenById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_3e8ebeaa0030af12ecaa12b9dbc" FOREIGN KEY ("writtenToId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_3e8ebeaa0030af12ecaa12b9dbc"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_5bd41ea8f9fe89e7ec2fd91915a"`);
        await queryRunner.query(`DROP TABLE "message"`);
    }

}
