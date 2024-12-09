import { Column, Model, Table, HasMany,DataType } from 'sequelize-typescript';
import { Address } from 'src/address/models/address.model';

export interface UserInterface {
  email: string;
  name: string;
  password: string;
  image: string;
  location: string;
}

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
}

@Table({ tableName: 'user',timestamps: true })
export class User extends Model implements UserInterface {
    
  @Column({ type: DataType.INTEGER,autoIncrement: true,primaryKey: true })
  id:number;

  @Column({type: DataType.STRING,allowNull:false, unique: true,validate: { isEmail: true} })
  email: string;

  @Column({type: DataType.STRING,allowNull:false})
  name: string;

  @Column({ type: DataType.STRING,allowNull:false})
  password: string;

  @Column({ type: DataType.STRING })
  image: string;

  @Column({ type: DataType.STRING })
  location: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
    defaultValue: UserRole.VIEWER,
  })
  role: UserRole;

  @HasMany(() => Address)
  addresses: Address[];

}

