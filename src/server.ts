import { app, sequelize } from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Disable foreign key checks for SQLite during sync to prevent alter/drop errors
    await sequelize.query('PRAGMA foreign_keys = false;');
    
    // Sync database (creates tables if they don't exist)
    await sequelize.sync();
    
    // Re-enable foreign key checks
    await sequelize.query('PRAGMA foreign_keys = true;');
    
    console.log('[db] Database synced successfully');

    app.listen(PORT, () => {
      console.log(`[server] Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('[server] Failed to start server:', error);
  }
};

startServer();
