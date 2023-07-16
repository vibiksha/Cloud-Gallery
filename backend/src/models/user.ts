import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "User",
})
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: false,
    allowNull: false,
    type: DataType.STRING,
  })
  id!: string;

  // @Column({
  //   allowNull: false,
  //   type: DataType.STRING,
  // })
  // uid!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  username!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  email!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  phoneNumber!: string;
}
