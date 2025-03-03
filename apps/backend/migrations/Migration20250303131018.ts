import { Migration } from '@mikro-orm/migrations';

export class Migration20250303131018 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "admin_login_otp" add column "admin_id" text null;`);
    this.addSql(`alter table "admin_login_otp" add constraint "admin_login_otp_admin_id_foreign" foreign key ("admin_id") references "admin" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "user" add constraint "user_email_identity_card_url_unique" unique ("email", "identity_card_url");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "admin_login_otp" drop constraint "admin_login_otp_admin_id_foreign";`);

    this.addSql(`alter table "admin_login_otp" drop column "admin_id";`);

    this.addSql(`alter table "user" drop constraint "user_email_identity_card_url_unique";`);
  }

}
