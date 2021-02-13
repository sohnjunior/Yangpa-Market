import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  Column,
} from 'typeorm';
import { User } from './user';
import { Product } from './product';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ownerId!: number;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn()
  owner!: User;

  @ManyToMany(() => Product)
  @JoinTable({ name: 'cart_products' })
  products!: Product[];
}
