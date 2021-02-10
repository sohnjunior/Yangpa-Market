import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { User } from './user';
import { Product } from './product';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => User)
  @JoinColumn()
  owner!: User;

  @ManyToMany(() => Product)
  @JoinTable()
  products!: Product[];
}
