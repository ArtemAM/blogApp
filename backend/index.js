import e from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const app = e();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(e.json());

app.get("/", (req, res) => {
	res.send("Hello World! This is the backend server.");
});

app.post("/login", (req, res) => {
	jwt.sign(
		{ email: req.body.email, password: req.body.password },
		SECRET_KEY,
		{ expiresIn: "1h" },
		(err, token) => {
			if (err) {
				return res.status(500).json({ error: "Error generating token" });
			}
			res.json({ token });
		}
	);
});

app.listen(PORT, (err) => {
	if (err) {
		console.error("Error starting server:", err);
		return;
	}
	console.log(`Server is running on port ${PORT}`);
});
