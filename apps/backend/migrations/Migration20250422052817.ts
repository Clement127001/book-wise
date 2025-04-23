import { Migration } from '@mikro-orm/migrations';

export class Migration20250422052817 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "genre" ("id" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" text not null, constraint "genre_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "genre" cascade;`);
  }

}
