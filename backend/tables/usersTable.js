const createUserTable = (db) => {
	db.run(
		`CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fullName TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          passwordHash TEXT NOT NULL,
          avatarUrl TEXT,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
		(err) => {
			if (err) {
				console.error("Error creating users table:", err);
			} else {
				console.log("Users table created or already exists");
			}
		}
	);
};

export default createUserTable;
