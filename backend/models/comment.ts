import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Product } from './product';
import { User } from './user';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  content!: string;

  @Column({ default: false })
  isSecret!: boolean;

  @CreateDateColumn({ select: false })
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ select: false })
  deletedAt!: Date;

  @ManyToOne(() => Product, (product) => product.id)
  product!: Product;

  @Column()
  productId!: number;

  @ManyToOne(() => User, (user) => user.id)
  author!: User;

  @Column()
  authorId!: number;
}
