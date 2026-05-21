import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { Class } from './Class';
import { Course } from './Course';

export class Student extends Model {
  public id!: number;
  public name!: string;
  public age!: number;
  public classId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly Class?: Class;
  public readonly Courses?: Course[];
}

Student.init(
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
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'students',
  }
);
