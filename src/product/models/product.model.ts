import { Column, Model, Table, HasMany ,BelongsTo,ForeignKey,BelongsToMany,DataType} from 'sequelize-typescript';
import { Category } from 'src/category/models/category.model';

// Define an interface for the User attributes
export interface ProductInterface {
  categoryId: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  inStock: boolean;
  images: string[];
  locations: string[];
}

@Table({ tableName: 'product', timestamps: true })
export class Product extends Model implements ProductInterface {

  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  categoryId: number;
  
  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  brand: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: number;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  inStock: boolean;

  @Column({ type: DataType.JSON })
  images: string[];

  @Column({ type: DataType.JSON })
  locations: string[];

  @BelongsTo(() => Category)
  category: Category;
  
}
