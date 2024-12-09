import { DataTypes } from 'sequelize';
import { Column, Model, Table, HasMany } from 'sequelize-typescript';

// Define an interface for the Category attributes
export interface CategoryInterface {
  name: string;

}

@Table({ tableName: 'category',timestamps: true })
export class Category extends Model implements CategoryInterface {
  
  @Column({ type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true })
  id:number;

  @Column({type: DataTypes.STRING,allowNull:false })
  name: string;

}

