import { db } from "../db.js";

export const createPost = (userId, title, text, tags, imageUrl) => {
	return new Promise((resolve, reject) => {
		const query = `
            INSERT INTO posts (user, title, text, tags, imageUrl, viewsCount, createdAt)
            VALUES (?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP)
        `;

		// Преобразуем массив тегов в строку (если передан)
		const tagsString = tags ? JSON.stringify(tags) : "[]";

		db.run(
			query,
			[userId, title, text, tagsString, imageUrl || null],
			function (err) {
				if (err) {
					return reject(err);
				}
				resolve(this.lastID); // Возвращаем ID созданной статьи
			}
		);
	});
};
