import { db } from "../db.js";

export const getTags = () => {
	return new Promise((resolve, reject) => {
		const query = `
          SELECT tags
          FROM posts
          ORDER BY createdAt DESC
          LIMIT 5
      `;

		db.all(query, [], (err, rows) => {
			if (err) {
				return reject(err);
			}

			// Преобразуем строки `tags` в массивы и объединяем их в один массив
			const tags = rows
				.map((row) => JSON.parse(row.tags)) // Преобразуем JSON-строку в массив
				.flat(); // Объединяем все массивы тегов в один массив

			// Убираем дубликаты тегов
			const uniqueTags = [...new Set(tags)];

			resolve(uniqueTags);
		});
	});
};
