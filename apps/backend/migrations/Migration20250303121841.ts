import { Migration } from '@mikro-orm/migrations';

export class Migration20250303121841 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "firstname" text not null, "lastname" text not null, "avatar_url" text null, "identity_card_url" text not null, "email" text not null, "is_deleted" boolean not null default false, "is_verified" text check ("is_verified" in ('Pending', 'Denied', 'Verified')) not null default 'Pending', constraint "user_pkey" primary key ("id"));`);

    this.addSql(`create table "user_login_otp" ("id" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" text not null, "otp" text not null, "is_used" boolean not null default false, constraint "user_login_otp_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "user_login_otp" cascade;`);
  }

}
