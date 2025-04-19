import { Migration } from '@mikro-orm/migrations';

export class Migration20250303191623 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "email_verification" ("id" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" text not null, constraint "email_verification_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "email_verification" cascade;`);
  }

}
