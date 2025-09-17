import { Migration } from '@mikro-orm/migrations';

export class Migration20250917150740 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "admin" add column "is_verified" boolean not null default false;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "admin" drop column "is_verified";`);
  }

}
