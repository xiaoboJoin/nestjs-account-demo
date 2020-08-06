import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Book } from './book.entity';

@Entity({ name: 'User' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;
  @Column({ type: 'varchar', length: 300, default: "" })
  password: string;
  @OneToMany(type => Book, book => book.user)
  books: [];

}