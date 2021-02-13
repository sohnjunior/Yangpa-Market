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
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: false })
  isApproved!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ select: false })
  deletedAt!: Date;

  @ManyToOne(() => Product, (product) => product.id)
  product!: Product;

  @Column({ select: false })
  productId!: number;

  @ManyToOne(() => User, (user) => user.id)
  buyer!: User;

  @Column({ select: false })
  buyerId!: number;
}
