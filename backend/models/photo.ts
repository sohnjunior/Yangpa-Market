import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  path!: string;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE' })
  product!: Product;
}
