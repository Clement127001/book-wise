import { Migration } from '@mikro-orm/migrations';

export class Migration20250303172518 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_email_identity_card_url_unique";`);

    this.addSql(`alter table "user" rename column "is_verified" to "verification_status";`);
    this.addSql(`alter table "user" add constraint "user_identity_card_url_unique" unique ("identity_card_url");`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`alter table "user_login_otp" add column "user_id" text not null;`);
    this.addSql(`alter table "user_login_otp" add constraint "user_login_otp_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user_login_otp" drop constraint "user_login_otp_user_id_foreign";`);

    this.addSql(`alter table "user" drop constraint "user_identity_card_url_unique";`);
    this.addSql(`alter table "user" drop constraint "user_email_unique";`);

    this.addSql(`alter table "user" rename column "verification_status" to "is_verified";`);
    this.addSql(`alter table "user" add constraint "user_email_identity_card_url_unique" unique ("email", "identity_card_url");`);

    this.addSql(`alter table "user_login_otp" drop column "user_id";`);
  }

}
