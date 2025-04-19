import { Migration } from '@mikro-orm/migrations';

export class Migration20250301100310 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "admin_login_otp" ("id" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" text not null, "otp" text not null, "is_used" boolean not null default false, constraint "admin_login_otp_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "admin_login_otp" cascade;`);
  }

}
