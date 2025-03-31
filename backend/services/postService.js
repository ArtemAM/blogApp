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

export const getPostById = (id) => {
	return new Promise((resolve, reject) => {
		const query = `
          SELECT posts.id, posts.title, posts.text, posts.tags, posts.imageUrl, posts.viewsCount, posts.createdAt,
                 users.fullName AS author
          FROM posts
          JOIN users ON posts.user = users.id
          WHERE posts.id = ?
      `;

		db.get(query, [id], (err, row) => {
			if (err) {
				return reject(err);
			}
			if (!row) {
				return resolve(null); // Если статья не найдена
			}

			// Преобразуем строку tags обратно в массив
			const post = {
				...row,
				tags: JSON.parse(row.tags),
			};
			resolve(post);
		});
	});
};

export const incrementPostViews = (postId) => {
	return new Promise((resolve, reject) => {
		const query = `
          UPDATE posts
          SET viewsCount = viewsCount + 1
          WHERE id = ?
      `;

		db.run(query, [postId], function (err) {
			if (err) {
				return reject(err);
			}
			resolve(true); // Успешное обновление
		});
	});
};

export const deletePostById = (postId, userId) => {
	return new Promise((resolve, reject) => {
		// SQL-запрос для удаления статьи, если пользователь является её автором
		const query = `
          DELETE FROM posts
          WHERE id = ? AND user = ?
      `;

		db.run(query, [postId, userId], function (err) {
			if (err) {
				return reject(err);
			}

			// Если строка была удалена, возвращаем true, иначе false
			resolve(this.changes > 0);
		});
	});
};
