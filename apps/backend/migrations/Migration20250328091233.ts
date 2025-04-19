import { Migration } from '@mikro-orm/migrations';

export class Migration20250328091233 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "account" ("id" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "firstname" text not null, "lastname" text not null, "email" text not null, "avatar_url" text null, "role" text check ("role" in ('Admin', 'User')) not null, constraint "account_pkey" primary key ("id"));`);
    this.addSql(`alter table "account" add constraint "account_email_unique" unique ("email");`);

    this.addSql(`alter table "admin_login_otp" drop constraint "admin_login_otp_admin_id_foreign";`);

    this.addSql(`alter table "user_login_otp" drop constraint "user_login_otp_user_id_foreign";`);

    this.addSql(`alter table "admin" drop constraint "admin_email_unique";`);
    this.addSql(`alter table "admin" drop constraint "admin_pkey";`);
    this.addSql(`alter table "admin" drop column "firstname", drop column "lastname", drop column "avatar_url", drop column "email";`);

    this.addSql(`alter table "admin" add column "user_id" text not null;`);
    this.addSql(`alter table "admin" add constraint "admin_user_id_foreign" foreign key ("user_id") references "account" ("id") on update cascade;`);
    this.addSql(`alter table "admin" add constraint "admin_user_id_unique" unique ("user_id");`);
    this.addSql(`alter table "admin" add constraint "admin_pkey" primary key ("id", "user_id");`);

    this.addSql(`alter table "admin_login_otp" add column "admin_user_id" text null;`);
    this.addSql(`alter table "admin_login_otp" add constraint "admin_login_otp_admin_id_admin_user_id_foreign" foreign key ("admin_id", "admin_user_id") references "admin" ("id", "user_id") on update cascade on delete set null;`);

    this.addSql(`alter table "user" drop constraint "user_email_unique";`);
    this.addSql(`alter table "user" drop constraint "user_pkey";`);
    this.addSql(`alter table "user" drop column "firstname", drop column "lastname", drop column "avatar_url", drop column "email";`);

    this.addSql(`alter table "user" add column "user_id" text not null;`);
    this.addSql(`alter table "user" add constraint "user_user_id_foreign" foreign key ("user_id") references "account" ("id") on update cascade;`);
    this.addSql(`alter table "user" add constraint "user_user_id_unique" unique ("user_id");`);
    this.addSql(`alter table "user" add constraint "user_pkey" primary key ("id", "user_id");`);

    this.addSql(`alter table "user_login_otp" add column "user_user_id" text not null;`);
    this.addSql(`alter table "user_login_otp" add constraint "user_login_otp_user_id_user_user_id_foreign" foreign key ("user_id", "user_user_id") references "user" ("id", "user_id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "admin" drop constraint "admin_user_id_foreign";`);

    this.addSql(`alter table "user" drop constraint "user_user_id_foreign";`);

    this.addSql(`drop table if exists "account" cascade;`);

    this.addSql(`alter table "admin_login_otp" drop constraint "admin_login_otp_admin_id_admin_user_id_foreign";`);

    this.addSql(`alter table "user_login_otp" drop constraint "user_login_otp_user_id_user_user_id_foreign";`);

    this.addSql(`alter table "admin" drop constraint "admin_user_id_unique";`);
    this.addSql(`alter table "admin" drop constraint "admin_pkey";`);
    this.addSql(`alter table "admin" drop column "user_id";`);

    this.addSql(`alter table "admin" add column "firstname" text not null, add column "lastname" text not null, add column "avatar_url" text null, add column "email" text not null;`);
    this.addSql(`alter table "admin" add constraint "admin_email_unique" unique ("email");`);
    this.addSql(`alter table "admin" add constraint "admin_pkey" primary key ("id");`);

    this.addSql(`alter table "admin_login_otp" drop column "admin_user_id";`);

    this.addSql(`alter table "admin_login_otp" add constraint "admin_login_otp_admin_id_foreign" foreign key ("admin_id") references "admin" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "user" drop constraint "user_user_id_unique";`);
    this.addSql(`alter table "user" drop constraint "user_pkey";`);
    this.addSql(`alter table "user" drop column "user_id";`);

    this.addSql(`alter table "user" add column "firstname" text not null, add column "lastname" text not null, add column "avatar_url" text null, add column "email" text not null;`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);
    this.addSql(`alter table "user" add constraint "user_pkey" primary key ("id");`);

    this.addSql(`alter table "user_login_otp" drop column "user_user_id";`);

    this.addSql(`alter table "user_login_otp" add constraint "user_login_otp_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
  }

}
