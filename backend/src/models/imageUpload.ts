import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user"; // Assuming you have a User model defined

@Table({
  timestamps: false,
  tableName: "imageUpload",
})
export class imageUpload extends Model<imageUpload> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  userId!: string;


  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  key!: string;
}
