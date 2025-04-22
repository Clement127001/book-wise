import { Migration } from '@mikro-orm/migrations';

export class Migration20250422132350 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "borrow_request" ("id" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" text not null, "user_user_id" text not null, "book_id" text not null, "status" text check ("status" in ('Pending', 'Accepted', 'Borrowed', 'Rejected', 'Expired')) not null, "borrow_request_expires_at" timestamptz null, "borrow_book_expires_at" timestamptz null, "cool_down_expires_at" timestamptz null, "reason_for_rejection" text null, constraint "borrow_request_pkey" primary key ("id"));`);
    this.addSql(`create index "borrow_request_book_id_index" on "borrow_request" ("book_id");`);
    this.addSql(`create index "borrow_request_user_id_user_user_id_index" on "borrow_request" ("user_id", "user_user_id");`);

    this.addSql(`create table "borrowed_book" ("id" text not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" text not null, "user_user_id" text not null, "book_id" text not null, "fine_amount" int not null default 0, "expected_return" timestamptz null, "actual_return" timestamptz null, "status" text check ("status" in ('Borrowed', 'Returned', 'Late Return')) not null, constraint "borrowed_book_pkey" primary key ("id"));`);
    this.addSql(`create index "borrowed_book_book_id_index" on "borrowed_book" ("book_id");`);
    this.addSql(`create index "borrowed_book_user_id_user_user_id_index" on "borrowed_book" ("user_id", "user_user_id");`);

    this.addSql(`alter table "borrow_request" add constraint "borrow_request_user_id_user_user_id_foreign" foreign key ("user_id", "user_user_id") references "user" ("id", "user_id") on update cascade;`);
    this.addSql(`alter table "borrow_request" add constraint "borrow_request_book_id_foreign" foreign key ("book_id") references "book" ("id") on update cascade;`);

    this.addSql(`alter table "borrowed_book" add constraint "borrowed_book_user_id_user_user_id_foreign" foreign key ("user_id", "user_user_id") references "user" ("id", "user_id") on update cascade;`);
    this.addSql(`alter table "borrowed_book" add constraint "borrowed_book_book_id_foreign" foreign key ("book_id") references "book" ("id") on update cascade;`);

    this.addSql(`alter table "book" add column "is_deleted" boolean not null default false;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "borrow_request" cascade;`);

    this.addSql(`drop table if exists "borrowed_book" cascade;`);

    this.addSql(`alter table "book" drop column "is_deleted";`);
  }

}
