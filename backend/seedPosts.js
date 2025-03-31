import { createPost } from "./services/postService.js";
import { createUser } from "./services/userService.js";
import { getUsersCount } from "./services/userService.js";
import { getPostsCount } from "./services/postService.js";

export const seedPosts = async () => {
	const users = [
		{
			id: 1,
			fullName: "John Doe",
			email: "john@example.com",
			password: "password1",
		},
		{
			id: 2,
			fullName: "Jane Smith",
			email: "jane@example.com",
			password: "password2",
		},
		{
			id: 3,
			fullName: "Alice Johnson",
			email: "alice@example.com",
			password: "password3",
		},
		{
			id: 4,
			fullName: "Bob Brown",
			email: "bob@example.com",
			password: "password4",
		},
		{
			id: 5,
			fullName: "Charlie White",
			email: "charlie@example.com",
			password: "password5",
		},
	];

	const posts = [
		{
			userId: 1,
			title: "First Post",
			text: "This is the content of the first post.",
			tags: ["tag1", "tag2"],
			imageUrl: null,
		},
		{
			userId: 1,
			title: "Second Post",
			text: "This is the content of the second post.",
			tags: ["example", "post"],
			imageUrl: null,
		},
		{
			userId: 2,
			title: "Third Post",
			text: "This is the content of the third post.",
			tags: ["third", "post"],
			imageUrl: null,
		},
		{
			userId: 2,
			title: "Fourth Post",
			text: "This is the content of the fourth post.",
			tags: ["fourth", "example"],
			imageUrl: null,
		},
		{
			userId: 3,
			title: "Fifth Post",
			text: "This is the content of the fifth post.",
			tags: ["fifth", "content"],
			imageUrl: null,
		},
		{
			userId: 3,
			title: "Sixth Post",
			text: "This is the content of the sixth post.",
			tags: ["sixth", "post"],
			imageUrl: null,
		},
	];

	// Проверяем, есть ли записи в таблице users
	const userCount = await getUsersCount();
	if (userCount === 0) {
		// Если пользователей нет, добавляем их
		for (const user of users) {
			try {
				const userId = await createUser(
					user.fullName,
					user.email,
					user.password
				);
				console.log(`User "${user.fullName}" added with ID: ${userId}`);
			} catch (err) {
				console.error(`Error seeding user "${user.fullName}":`, err.message);
			}
		}
	} else {
		console.log("Users already exist in the database. Skipping user seeding.");
	}

	// Проверяем, есть ли записи в таблице posts
	const postCount = await getPostsCount();
	if (postCount === 0) {
		// Если записей нет, добавляем посты
		for (const post of posts) {
			try {
				const postId = await createPost(
					post.userId,
					post.title,
					post.text,
					post.tags,
					post.imageUrl
				);
				console.log(`Post "${post.title}" added with ID: ${postId}`);
			} catch (err) {
				console.error(`Error seeding post "${post.title}":`, err.message);
			}
		}
	} else {
		console.log("Posts already exist in the database. Skipping post seeding.");
	}
};
