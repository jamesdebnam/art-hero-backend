import sqlite3 from 'sqlite3';
import path from 'path';

// Define types for our database operations
interface Masterpiece {
  id: number;
  data: any;
  created_at: string;
}

// Create a new database or connect to an existing one
const dbPath: string = path.resolve(__dirname, '../masterpieces.db');
const db: sqlite3.Database = new sqlite3.Database(dbPath, (err: Error | null) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the masterpieces database.');
    
    // Create the masterpieces table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS masterpieces (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `, (err: Error | null) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Masterpieces table ready.');
      }
    });
  }
});

// Database operations
const dbOperations = {
  // Create a new masterpiece
  createMasterpiece: (data: any): Promise<{ id: number; data: any }> => {
    return new Promise((resolve, reject) => {
      const jsonData: string = JSON.stringify(data);
      db.run('INSERT INTO masterpieces (data) VALUES (?)', [jsonData], function(this: sqlite3.RunResult, err: Error | null) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, data });
        }
      });
    });
  },

  // Get all masterpieces
  getAllMasterpieces: (): Promise<Masterpiece[]> => {
    return new Promise((resolve, reject) => {
      db.all('SELECT id, data, created_at FROM masterpieces', [], (err: Error | null, rows: any[]) => {
        if (err) {
          reject(err);
        } else {
          // Parse the JSON data for each row
          const masterpieces: Masterpiece[] = rows.map(row => ({
            id: row.id,
            data: JSON.parse(row.data),
            created_at: row.created_at
          }));
          resolve(masterpieces);
        }
      });
    });
  },

  // Get a masterpiece by ID
  getMasterpieceById: (id: number | string): Promise<Masterpiece> => {
    return new Promise((resolve, reject) => {
      db.get('SELECT id, data, created_at FROM masterpieces WHERE id = ?', [id], (err: Error | null, row: any) => {
        if (err) {
          reject(err);
        } else if (!row) {
          reject(new Error('Masterpiece not found'));
        } else {
          resolve({
            id: row.id,
            data: JSON.parse(row.data),
            created_at: row.created_at
          });
        }
      });
    });
  }
};

export default dbOperations;