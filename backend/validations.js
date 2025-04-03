import { body } from "express-validator";

export const loginValidation = [
	body("email").isEmail().withMessage("Invalid email format"),
	body("password").isLength({ min: 4 }).withMessage("Password is required"),
];

export const registerValidation = [
	body("fullName").notEmpty().withMessage("Full name is required"),
	body("email").isEmail().withMessage("Invalid email format"),
	body("password")
		.isLength({ min: 4 })
		.withMessage("Password must be at least 6 characters long"),
	body("avatarUrl")
		.optional()
		.isURL()
		.withMessage("Avatar URL must be a valid URL"),
];

export const postValidation = [
	body("title").notEmpty().withMessage("Title is required").isString(),
	body("text").notEmpty().withMessage("Text is required").isString(),
	body("tags").optional().isArray(),
	body("imageUrl").optional().isString(),
];
