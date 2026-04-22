import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

async function setupDatabase() {
  try {
    // Connect without database selection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || ''
    });

    console.log('Connected to MySQL server');

    // Create database
    await connection.query('CREATE DATABASE IF NOT EXISTS todo_app');
    console.log('Database created/verified');

    // Use the database
    await connection.query('USE todo_app');

    // Disable foreign key checks to allow dropping tables
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    
    // Drop and recreate todos table first (child table)
    await connection.query('DROP TABLE IF EXISTS todos');
    console.log('Todos table dropped');
    
    // Drop and recreate users table (parent table)
    await connection.query('DROP TABLE IF EXISTS users');
    console.log('Users table dropped');
    
    // Re-enable foreign key checks
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');
    
    // Create users table
    await connection.query(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created');

    // Create todos table
    await connection.query(`
      CREATE TABLE todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('Todos table created');

    console.log('\nDatabase setup completed successfully!');
    console.log('Tables created:');
    console.log('  - users (id, name, email, password, created_at)');
    console.log('  - todos (id, user_id, title, completed, created_at)');

    await connection.end();
  } catch (error) {
    console.error('Error setting up database:', error.message);
    process.exit(1);
  }
}

setupDatabase();
