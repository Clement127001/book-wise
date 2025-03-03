import { Migration } from '@mikro-orm/migrations';

export class Migration20250303105504 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "admin" add constraint "admin_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "admin" drop constraint "admin_email_unique";`);
  }

}
