import { Migration } from '@mikro-orm/migrations';

export class Migration20250301111807 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "admin" ("id" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "firstname" text not null, "lastname" text not null, "avatar_url" text null, "email" text not null, constraint "admin_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "admin" cascade;`);
  }

}
