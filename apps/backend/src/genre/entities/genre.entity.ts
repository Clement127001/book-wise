import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'base.entity';

@Entity()
export class Genre extends BaseEntity {
  @Property()
  title: string;

  constructor({ title }: { title: string }) {
    super();
    this.title = title;
  }
}
