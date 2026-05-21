import express from 'express';
import routes from './routes';
import { sequelize } from './config/database';
// Import models so Sequelize knows about them during sync
import './models';

const app = express();

app.use(express.json());

// Routes
app.use('/api', routes);

export { app, sequelize };
