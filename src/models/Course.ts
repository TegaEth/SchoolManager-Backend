import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Student } from './Student';

export class Course extends Model {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly Students?: Student[];
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'courses',
  }
);
