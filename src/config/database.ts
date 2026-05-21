import { Sequelize } from 'sequelize';
import path from 'path';

const dbPath = path.join(__dirname, '../../data/dev.db');

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
});
