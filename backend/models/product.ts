import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Photo } from './photo';
import { Comment } from './comment';
import { User } from './user';
import { Order } from './order';
import { Category } from './category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unsigned: true, default: 0 })
  views!: number;

  @Column({ unsigned: true, default: 0 })
  likes!: number;

  @Column({ type: 'text' })
  description!: string;

  @Column({ unsigned: true })
  price!: number;

  @Column({ default: false })
  isSold!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ select: false })
  deletedAt!: Date;

  @OneToMany(() => Photo, (photo) => photo.product, { cascade: true })
  photos!: Photo[];

  @OneToMany(() => Comment, (comment) => comment.product)
  comments!: Comment[];

  @OneToMany(() => Order, (order) => order.product)
  orders!: Order[];

  @ManyToOne(() => Category, (category) => category.id)
  category!: Category;

  @Column({ select: false })
  categoryId!: number;

  @ManyToOne(() => User, (user) => user.id)
  seller!: User;

  @Column({ select: false })
  sellerId!: number;
}
