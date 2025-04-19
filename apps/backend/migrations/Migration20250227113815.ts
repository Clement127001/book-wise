import { Migration } from '@mikro-orm/migrations';

export class Migration20250227113815 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "register_otp" ("id" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" text not null, "otp" text not null, "is_used" boolean not null default false, constraint "register_otp_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "register_otp" cascade;`);
  }

}
