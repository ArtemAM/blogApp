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

				// Выполняем дополнительный запрос для получения данных пользователя
				const selectQuery = `SELECT * FROM users WHERE id = ?`;
				db.get(selectQuery, [this.lastID], (err, user) => {
					if (err) {
						return reject(err);
					}
					resolve(user); // Возвращаем данные нового пользователя
				});
			}
		);
	});
};

export const findUserById = (id) => {
	return new Promise((resolve, reject) => {
		const query = `SELECT * FROM users WHERE id = ?`;
		db.get(query, [id], (err, user) => {
			if (err) {
				return reject(err);
			}
			resolve(user);
		});
	});
};

export const getUsersCount = () => {
	return new Promise((resolve, reject) => {
		const query = `SELECT COUNT(*) AS count FROM users`;
		db.get(query, (err, row) => {
			if (err) {
				return reject(err);
			}
			resolve(row.count);
		});
	});
};
