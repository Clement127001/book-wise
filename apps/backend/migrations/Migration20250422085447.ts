import { Migration } from '@mikro-orm/migrations';

export class Migration20250422085447 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "book" add constraint "book_author_title_unique" unique ("author", "title");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "book" drop constraint "book_author_title_unique";`);
  }

}
