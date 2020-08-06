import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'Book' })
export class Book extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column()
  userid: string;

  @ManyToOne(type => User, user => user.books)
  @JoinColumn({ name: 'userid' })
  user: User;

}
