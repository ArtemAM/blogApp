const createPostsTable = (db) => {
	db.run(
		`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user INTEGER NOT NULL,
        title TEXT NOT NULL,
        text TEXT NOT NULL,
        tags TEXT DEFAULT '[]',
        imageUrl TEXT,
        viewsCount INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user) REFERENCES users(id) ON DELETE CASCADE
    )`,
		(err) => {
			if (err) {
				console.error("Error creating posts table:", err);
			} else {
				console.log("Posts table created or already exists");
			}
		}
	);
};

export default createPostsTable;
