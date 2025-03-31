import { db } from "../db.js";

export const findUserByEmail = (email) => {
	return new Promise((resolve, reject) => {
		const query = `SELECT * FROM users WHERE email = ?`;
		db.get(query, [email], (err, user) => {
			if (err) {
				return reject(err);
			}
			resolve(user);
		});
	});
};

export const createUser = (fullName, email, passwordHash, avatarUrl) => {
	return new Promise((resolve, reject) => {
		const query = `INSERT INTO users (fullName, email, passwordHash, avatarUrl) VALUES (?, ?, ?, ?)`;
		db.run(
			query,
			[fullName, email, passwordHash, avatarUrl || null],
			function (err) {
				if (err) {
					return reject(err);
				}
				resolve(this.lastID); // Возвращаем ID нового пользователя
			}
		);
	});
};
