const mysql = require('mysql2/promise');

async function runMigration() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'homestay'
  });

  console.log('Creating conversations table...');
  await conn.query(`
    CREATE TABLE IF NOT EXISTS conversations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      guest_id INT NOT NULL,
      host_id INT NOT NULL,
      homestay_id INT NOT NULL,
      last_message TEXT NULL,
      last_message_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_guest (guest_id),
      INDEX idx_host (host_id),
      INDEX idx_homestay (homestay_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  console.log('Creating messages table...');
  await conn.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      conversation_id INT NOT NULL,
      sender_id INT NOT NULL,
      receiver_id INT NOT NULL,
      content TEXT NOT NULL,
      is_read TINYINT(1) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_conv (conversation_id),
      INDEX idx_sender (sender_id),
      INDEX idx_receiver (receiver_id),
      INDEX idx_read (is_read),
      FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  const [tables] = await conn.query('SHOW TABLES');
  console.log('Migration completed! Tables in homestay:', tables);
  await conn.end();
}

runMigration().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
