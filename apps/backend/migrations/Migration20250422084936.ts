import { Migration } from '@mikro-orm/migrations';

export class Migration20250422084936 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "book" ("id" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" text not null, "author" text not null, "summary" text not null, "total" int not null, "available" int not null, "image_url" text not null, "genre_id" text not null, "rating" int not null default 0, constraint "book_pkey" primary key ("id"));`);

    this.addSql(`alter table "book" add constraint "book_genre_id_foreign" foreign key ("genre_id") references "genre" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "book" cascade;`);
  }

}
