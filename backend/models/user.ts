import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Comment } from './comment';
import { Product } from './product';
import { Order } from './order';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50, unique: true })
  email!: string;

  @Column({ length: 50, unique: true })
  nickname!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  contact!: string;

  @Column({ nullable: true })
  avatar!: string;

  @Column({ default: false })
  isAdmin!: boolean;

  @CreateDateColumn({ select: false })
  createdAt!: Date;

  @UpdateDateColumn({ select: false })
  updatedAt!: Date;

  @DeleteDateColumn({ select: false })
  deletedAt!: Date;

  @OneToMany(() => Comment, (comment) => comment.author)
  comments!: Comment[];

  @OneToMany(() => Product, (product) => product.seller)
  products!: Product[];

  @OneToMany(() => Order, (order) => order.buyer)
  buyers!: Order[];
}
