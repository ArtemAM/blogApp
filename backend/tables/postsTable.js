export default (db) => {
	return new Promise((resolve, reject) => {
		db.run(
			`
          CREATE TABLE IF NOT EXISTS posts (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user INTEGER NOT NULL,
              title TEXT NOT NULL,
              text TEXT NOT NULL,
              tags TEXT DEFAULT '[]',
              imageUrl TEXT,
              viewsCount INTEGER DEFAULT 0,
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (user) REFERENCES users(id)
          )
          `,
			(err) => {
				if (err) {
					return reject(err);
				}
				console.log("Posts table created");
				resolve();
			}
		);
	});
};
