import { Column, Model, Table, HasMany, ForeignKey,DataType ,BelongsTo} from 'sequelize-typescript';
import { User } from 'src/user/models/user.model';

// Define an interface for the User attributes
export interface AddressInterface {
  userId: number;
  doorNoAndVillage: string;
  district: string;
  state: string;
  pincode: number;
  landmark: string;
  country: string;
}

@Table({ tableName: 'address',timestamps: true })
export class Address extends Model implements AddressInterface {

  @Column({ type: DataType.INTEGER,autoIncrement: true,primaryKey: true })
  id:number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @Column({type: DataType.STRING,allowNull:false })
  doorNoAndVillage: string;

  @Column({type: DataType.STRING,allowNull:false })
  district: string;

  @Column({type: DataType.STRING,allowNull:false })
  state: string;

  @Column({type: DataType.INTEGER,allowNull:false })
  pincode: number;

  @Column({type: DataType.STRING,allowNull:false })
  landmark: string;

  @Column({type: DataType.STRING, defaultValue: 'India' })
  country: string;

  @BelongsTo(() => User)
  user: User;

}

