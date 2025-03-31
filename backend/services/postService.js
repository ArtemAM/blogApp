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

export const getAllPosts = () => {
	return new Promise((resolve, reject) => {
		const query = `
          SELECT posts.id, posts.title, posts.text, posts.tags, posts.imageUrl, posts.viewsCount, posts.createdAt,
                 users.fullName AS author
          FROM posts
          JOIN users ON posts.user = users.id
      `;

		db.all(query, [], (err, rows) => {
			if (err) {
				return reject(err);
			}
			// Преобразуем строку tags обратно в массив
			const posts = rows.map((post) => ({
				...post,
				tags: JSON.parse(post.tags),
			}));
			resolve(posts);
		});
	});
};
