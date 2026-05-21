import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Student } from './Student';

export class Class extends Model {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Association methods to be added via Sequelize
  public readonly Students?: Student[];
}

Class.init(
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
    tableName: 'classes',
  }
);
